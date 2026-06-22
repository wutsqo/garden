import { getPayload } from "payload";
import config from "@payload-config";
import type { Homepage, Media } from "@/payload.types";
import { getImageSrc } from "@utils/images";
import SectionTitle from "../components/section-title";
import s from "./contact.module.css";
import ContactLinks, { ContactLink } from "./contact-client";

type SocialLink = NonNullable<Homepage["socialLinks"]>[number];

const getContactLink = (link: SocialLink): ContactLink => {
  const icon = link.icon as Media;

  return {
    id: link.id ?? `${link.variant}-${link.label}`,
    label: link.label,
    url: link.url,
    variant: link.variant,
    iconSrc: getImageSrc({ img: link.icon }),
    iconAlt: icon.alt ?? link.label,
  };
};

const Contact = async () => {
  const payload = await getPayload({ config });
  const homepage = await payload.findGlobal({ slug: "homepage" });
  const socialLinks = homepage.socialLinks?.map(getContactLink) ?? [];

  return (
    <div className="container mx-auto mt-24 px-6 pb-32">
      <SectionTitle number="🤝" title="Connect" />
      <div className={s.content}>Let&apos; connect! Say hello and have a chat. →</div>
      <ContactLinks links={socialLinks} />
    </div>
  );
};

export default Contact;
