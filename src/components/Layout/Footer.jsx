import {
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-slate-900 text-white font-bold flex items-center justify-between py-12 px-12">
      <div className="w-1/4 flex flex-col justify-around">
        <div className="text-lg">Youtube Content Automation</div>
        <div className="text-sm font-light">
          The automation that you have been waiting for!!
        </div>
      </div>
      <div className="w-3/4 flex flex-col items-center">
        <p className="text-sm mb-3">Created by Ashutosh Bind</p>
        <div className="flex justify-around items-center gap-x-8">
          <YoutubeIcon size={24} />
          <InstagramIcon size={24} />
          <TwitterIcon size={24} />
          <LinkedinIcon size={24} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
