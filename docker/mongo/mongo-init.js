db.createUser(
    {
        user: "memoapp",
        pwd: "memoapp-pw",
        roles: [
            {
                role: "readWrite",
                db: "drama-memoapp-api"
            }
        ]
    }
);