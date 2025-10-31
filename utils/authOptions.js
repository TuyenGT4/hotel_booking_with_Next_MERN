import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import User from "@/model/user";

import bcrypt from "bcrypt";

import dbConnect from "@/utils/dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await dbConnect();

        const { email, phone, password } = credentials;

        if (!email && !phone) {
          throw new Error("Email hoặc số điện thoại là bắt buộc");
        }

        const user = await User.findOne({
          $or: [{ email: email || "" }, { phone: phone || "" }],
        });

        if (!user?.password) {
          throw new Error(
            "Vui lòng đăng nhập thông qua phương thức đã sử dụng để đăng ký!"
          );
        }

        const isPasswordValid =
          user && (await bcrypt.compare(password, user.password));

        if (!isPasswordValid) {
          throw new Error("Thông tin đăng nhập không hợp lệ");
        }

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();

      const { email, phone } = user;

      let dbUser = await User.findOne({
        $or: [{ email: email || "" }, { phone: phone || "" }],
      });

      if (!dbUser && account?.provider === "google") {
        dbUser = await User.create({
          email,
          name: user?.name,
          image: user?.image,
        });
      }

      return true;
    },

    async redirect({ url, baseUrl }) {
      return `${baseUrl}/`;
    },

    jwt: async ({ token, user }) => {
      const dbUser = await User.findOne({
        $or: [{ email: token.email || "" }, { phone: token.phone || "" }],
      });

      if (dbUser) {
        dbUser.password = undefined;

        token.user = {
          ...dbUser.user,
          role: dbUser.role || "user",
        };
      }

      return token;
    },

    session: async ({ session, token }) => {
      session.user = {
        ...token.user,
        role: token.user.role || "user",
      };

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};
