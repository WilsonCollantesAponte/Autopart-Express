import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'


const handler = NextAuth({
    providers: [GoogleProvider({
        clientId : "173444235507-cfg95v9p9u0lb0vbdnb7i583f15i8na1.apps.googleusercontent.com",
        clientSecret: "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",
    })]
})  

export {handler as GET, handler as POST};
