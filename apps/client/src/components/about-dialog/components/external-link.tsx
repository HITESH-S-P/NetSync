import Image from "next/image";

import { Send } from "lucide-react";
import { useTheme } from "next-themes";

import {
  GITHUB_URL,
  REPO_URL,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface ExternalLinkProps {
  forceDark?: boolean;
}

const ExternalLink = ({ forceDark = false }: ExternalLinkProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Button variant="outline" size="sm" asChild>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit GitHub profile (opens in new tab)"
        >
          <Image
            src={`/images/${resolvedTheme === "light" && !forceDark ? "octocat" : "octocat-white"}.svg`}
            alt="GitHub logo"
            className="mr-2"
            width={16}
            height={16}
          />
          GitHub Profile
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit RVsync GitHub repository (opens in new tab)"
        >
          <Image
            src={`/images/${resolvedTheme === "light" && !forceDark ? "octocat" : "octocat-white"}.svg`}
            alt="GitHub logo"
            className="mr-2"
            width={16}
            height={16}
          />
          RVsync GitHub
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact (opens in new tab)"
        >
          <Send className="mr-2 size-4" />
          Contact
        </a>
      </Button>
    </>
  );
};

export { ExternalLink };
