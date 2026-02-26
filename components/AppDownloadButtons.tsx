import Link from "next/link";
import Image from "next/image";

export default function AppDownloadButtons() {
  return (
    <div className="flex gap-4">
      {/* Nút iOS */}
      <Link href="https://apps.apple.com" target="_blank">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
          alt="Download on the App Store"
          width={150}
          height={50}
          className="h-12 w-auto hover:scale-105 transition-transform cursor-pointer"
        />
      </Link>

      {/* Nút Android */}
      <Link href="https://play.google.com" target="_blank">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Get it on Google Play"
          width={150}
          height={50}
          className="h-12 w-auto hover:scale-105 transition-transform cursor-pointer"
        />
      </Link>
    </div>
  );
}
