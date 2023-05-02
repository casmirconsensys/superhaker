const metadata: IEssenceMetadata = {
    metadata_id: uuidv4(),
    app_id: "cyberconnect",
    content:
      JSON.stringify({
        contentHash: encryptedContentHash,
        encryptedSymmetricKey: encryptedContent.encryptedSymmetricKey,
      }),
            // other fields
            ...,
};
