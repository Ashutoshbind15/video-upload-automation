"use client";

const ApprovedTab = ({ spaceData }) => {
  return (
    <ul>
      {spaceData?.videos.map((video) => {
        const approved = video.requests.find(
          (req) => req.approved === 2 && req.providerUploadProgress < 100
        );

        if (approved)
          return (
            <div
              key={video?._id}
              className="flex items-center justify-between p-5"
            >
              <div>
                <p className="text-xl font-semibold">
                  {approved.uploader.username}
                </p>
                <p className="text-lg font-light">{approved.uploader.email}</p>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={approved.cloudUrl}
                  className="underline"
                >
                  Cloud Video Preview
                </a>
              </div>
            </div>
          );
      })}
    </ul>
  );
};

export default ApprovedTab;
