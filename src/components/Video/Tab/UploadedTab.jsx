"use client";

const UploadedTab = ({ spaceData }) => {
  return (
    <ul>
      {spaceData?.videos.map((video) => {
        const uploaded = video.requests.find(
          (req) => req.approved === 2 && req.providerUploadProgress === 100
        );

        if (uploaded)
          return (
            <div
              key={video?._id}
              className="border-y-2 py-3 px-6 mb-3 flex items-center justify-between"
            >
              <div>
                <div>
                  <p className="text-xl font-semibold">{video.title}</p>
                  <p className="text-lg font-light">{video.description}</p>
                </div>

                <div>
                  <p className="text-xl font-semibold">
                    {uploaded.uploader.username}
                  </p>
                  <p className="text-lg font-light">
                    {uploaded.uploader.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-y-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={uploaded.cloudUrl}
                  className="underline"
                >
                  Cloud Video Preview
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={uploaded.providerUrl}
                  className="underline"
                >
                  Provider Video Preview
                </a>
              </div>
            </div>
          );
      })}
    </ul>
  );
};

export default UploadedTab;
