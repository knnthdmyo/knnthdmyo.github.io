import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface TagProps {
  name: string;
  icon: IconProp;
  link: string;
  color: string;
}

const Tag = memo(({ name, icon, link, color }: TagProps) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noreferrer"
      className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-2 border-2 gap-1 rounded-full transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      style={{ 
        borderColor: color, 
        color: color, 
        backgroundColor: `${color}CC`,
        boxShadow: `0 0 0 0 ${color}00`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 20px -4px ${color}80`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 0 ${color}00`;
      }}
    >
      <FontAwesomeIcon icon={icon} className="text-white transition-transform duration-300 group-hover:rotate-12" />
      <span className="text-white">{name}</span>
    </a>
  );
});

Tag.displayName = 'Tag';

export default Tag;

