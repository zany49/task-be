export const up = async (db, client) => {
    const session = client.startSession();
    try {
    await db.collection('Org').updateMany(    { },
        { $rename: { "name": "fullname" } });
    } finally {
        await session.endSession();
      }
};

export const down = async (db, client) => {
    const session = client.startSession();
    try {
    await db.collection('Org').updateMany(    { },
        { $rename: { "fullname": "name" } });
      }  finally {
            await session.endSession();
          }
};
