import { GithubOutlined } from "@ant-design/icons";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const rtr = useRouter();

  return (
    <div className="w-full bg-slate-900 text-white font-bold flex items-center justify-between py-12 px-12">
      <div className="flex-1 flex flex-col justify-around">
        <div className="text-lg">Youtube Content Automation</div>
        <div className="text-sm font-light">
          The automation that you have been waiting for!!
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm mb-3">Created by Ashutosh Bind</p>
        <div className="flex justify-around items-center gap-x-8">
          <a
            href="https://github.com/Ashutoshbind15/video-upload-automation"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
