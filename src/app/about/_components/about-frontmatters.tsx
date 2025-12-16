"use client";

import { cn } from "@/lib/utils";
import { InlineLink } from "@/components/ui/inline-link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiBluesky,
} from "@icons-pack/react-simple-icons";
export function AboutFrontmatters() {
  return (
    <>
      {/* Description */}
      <FrontmatterSection selectable>
        <p className="text-base font-normal leading-tight md:font-sans md:text-sm xl:text-base xl:leading-tight">
          Media artist and technologist, at the intersection of A, C, L and J
          (aka.{" "}
          <InlineLink
            // href="https://en.wikipedia.org/wiki/Broadway_Junction_station"
            href="https://www.google.com/maps/place/Broadway+Junction/@40.6787319,-73.9035614,3a,75y,359.14h,93.86t/data=!3m7!1e1!3m5!1sb-Nu0nM_950biY-rV4YluA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-3.8649363472115823%26panoid%3Db-Nu0nM_950biY-rV4YluA%26yaw%3D359.1401929572657!7i13312!8i6656!4m11!1m2!2m1!1sBroadway+Junction!3m7!1s0x89c25c44326ea8d7:0xb615ef8e8235c4c0!8m2!3d40.6788149!4d-73.9038739!10e5!15sChFCcm9hZHdheSBKdW5jdGlvbpIBF2xvZ2ljYWxfdHJhbnNpdF9zdGF0aW9u4AEA!16zL20vMGY0Nmpw?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="font-condensed font-bold"
          >
            Broadway Junction
          </InlineLink>
          ).
        </p>
      </FrontmatterSection>

      {/* Details */}
      <div
        className={cn(
          "flex flex-col overflow-hidden text-sm leading-tight transition-all md:h-auto",
        )}
      >
        {/* #1 Tags */}
        <FrontmatterSection dimmed={false} title="What">
          <p className={cn("font-normal lowercase italic")}>
            data, design, film, graphics, web, installation, photo
          </p>
        </FrontmatterSection>

        <FrontmatterSection dimmed={false} title="Where">
          <p className={cn("font-normal lowercase italic")}>
            Cambridge, MA / Brooklyn, NY / Shanghai, China
          </p>
        </FrontmatterSection>

        <FrontmatterSection dimmed={false} title="Why">
          <p className={cn("font-normal lowercase italic")}>why not?</p>
        </FrontmatterSection>

        {/* #8 Links */}
        <section
          className={cn(
            "mt-6",
            "text-right md:text-left",
            "flex flex-wrap gap-x-0 gap-y-1 sm:gap-x-1",
          )}
        >
          <FrontmatterExternalLink
            href="https://docs.google.com/document/d/1uRMwMvuVzd5XEVub3c0RRmnNdmSNQiB5MwLw3PCxz8s/edit?tab=t.0"
            title="CV"
            // icon={<File size={14} />}
          />
          <FrontmatterExternalLink
            href="https://www.instagram.com/hallucitalgia/"
            // title="Instagram"
            icon={<SiInstagram size={14} />}
          />

          <FrontmatterExternalLink
            href="https://bsky.app/profile/yufeng.bsky.social"
            // title="Bluesky"
            icon={<SiBluesky size={14} />}
          />
          <FrontmatterExternalLink
            href="https://x.com/yufengzhao_"
            // title="X"
            icon={<SiX size={14} />}
          />
          <FrontmatterExternalLink
            href="https://github.com/yz3440"
            // title="Github"
            icon={<SiGithub size={14} />}
          />

          <FrontmatterExternalLink
            href="https://www.linkedin.com/in/yufeng-zhao/"
            // title="LinkedIn"
            icon={<SiLinkedin size={14} />}
          />

          <FrontmatterExternalLink
            href="mailto:yufeng.zhao.p@outlook.com"
            // title="Email"
            icon={<Mail size={14} />}
          />
        </section>
      </div>
    </>
  );
}

function FrontmatterSection({
  children,
  dimmed,
  title,
  selectable = false,
}: {
  children: React.ReactNode;
  dimmed?: boolean;
  title?: string;
  selectable?: boolean;
}) {
  const titleHeader = title ? (
    <h3 className="font-condensed text-lg font-bold leading-tight md:text-base xl:text-lg xl:leading-tight">
      {title}
    </h3>
  ) : null;

  return (
    <section
      className={cn(
        "pb-4",
        dimmed && "opacity-100 transition-all hover:opacity-100 md:opacity-50",
        !selectable && "select-none",
      )}
    >
      {titleHeader}
      {children}
    </section>
  );
}

function FrontmatterExternalLink({
  href,
  title,
  icon,
}: {
  href: string;
  title?: string;
  icon?: React.ReactNode;
}) {
  const shouldTargetBlank = href.startsWith("http");

  return (
    <span className="">
      <InlineLink href={href} target={shouldTargetBlank ? "_blank" : ""}>
        <Button size={"sm"} variant={"accent"} className="group">
          <div className="flex items-center gap-1">
            <div className="-ml-1">
              {title && (
                <ArrowRight
                  size={12}
                  className="my-auto group-hover:animate-spin"
                />
              )}
            </div>
            <div className="group-hover:white-glow-text-md my-auto -translate-y-[1px] underline group-hover:text-green-500 group-hover:no-underline">
              {title && <div className="my-auto">{title}</div>}
              {icon && (
                <div className="m-auto flex items-center group-hover:animate-spin">
                  {icon}
                </div>
              )}
            </div>
          </div>
        </Button>
      </InlineLink>
    </span>
  );
}
