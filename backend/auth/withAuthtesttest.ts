import { Session } from "@keystone-6/types";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "next-session";
import { getSession } from "@keystone-6/keystone/session";
import { withSession } from "@keystone-6/keystone/session";
import { SessionContext } from "@keystone-6/types";

type NextApiRequestWithSession = NextApiRequest & { session?: Session };

export const withAuth = (handler: any) =>
  withSession(
    async (req: NextApiRequestWithSession, res: NextApiResponse) => {
      const session = await getSession(req, res);
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      return handler(req, res);
    },
    {
      // Define the options for the session middleware
      // This is an example of using the default options, you may customize as needed
      name: "myapp_session",
      secret: process.env.SESSION_SECRET,
      cookie: {
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    }
  );
