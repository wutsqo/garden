import { BookTimeline } from "@/payload.types";
import { BookCheck, BookmarkPlus, BookOpen, BookX, MessageCircle } from "lucide-react";
import RichText from "@components/rich-text";

interface Props {
  timelines: BookTimeline[];
}

const Timeline: React.FC<Props> = ({ timelines }) => {
  return (
    <>
      <div className="prose">
        <h2 className="border-bluish-purple mt-8 border-l-4 pl-2">Timeline</h2>
      </div>
      {timelines.length === 0 ? (
        <div className="mt-4 text-gray-500">No timeline data available</div>
      ) : (
        <div className="mt-4">
          <ul className="timeline timeline-snap-icon timeline-vertical timeline-compact -ml-2">
            {timelines.map((timeline, i) => (
              <TimelineItem
                key={timeline.id}
                timeline={timeline}
                isFirst={i === 0}
                isLast={i === timelines.length - 1}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

interface TimelineItemProps {
  timeline: BookTimeline;
  isFirst?: boolean;
  isLast?: boolean;
}

const timelineTypeMap: Record<BookTimeline["type"], string> = {
  tbr: "Added to TBR",
  started: "Started reading",
  comment: "Left a comment",
  finished: "Finished reading",
  "not-finished": "Not finished reading",
};

const timelineIconMap: Record<BookTimeline["type"], React.ReactNode> = {
  tbr: <BookmarkPlus size={16} stroke="white" />,
  started: <BookOpen size={16} stroke="white" />,
  comment: <MessageCircle size={16} stroke="white" />,
  finished: <BookCheck size={16} stroke="white" />,
  "not-finished": <BookX size={16} stroke="white" />,
};

const TimelineItem: React.FC<TimelineItemProps> = ({ timeline, isFirst, isLast }) => {
  return (
    <li>
      {!isFirst && <hr />}
      <div className="timeline-middle translate-y-1">
        <div className="bg-green-carribean rounded-full p-2">{timelineIconMap[timeline.type]}</div>
      </div>
      <div className="timeline-end timeline-box w-full px-6 py-3 text-base">
        <span className="text-xs text-gray-500">
          <span>{timelineTypeMap[timeline.type]} on &nbsp;</span>
          <time>
            {new Date(timeline.time).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </span>
        <div className="prose prose-sm prose-p:my-2 mt-2">{timeline.comment && <RichText data={timeline.comment} />}</div>
      </div>
      {!isLast && <hr />}
    </li>
  );
};

export default Timeline;
