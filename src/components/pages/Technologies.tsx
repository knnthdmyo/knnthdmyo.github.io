import { TECHNOLOGIES } from '@/assets/data/dummy';
import Tag from '@components/Tag';

const Technologies = () => {
  return (
    <div className="box-border md:p-20 p-8 flex flex-col xl:flex-row justify-between gap-4">
      <div className="flex flex-col md:gap-12 lg:pr-20">
        <h1 className="md:text-7xl text-4xl">Technologies</h1>
      </div>

      <div className="box-border xl:p-5 p-8 flex flex-wrap gap-2">
        {Object.values(TECHNOLOGIES)
          .flat()
          .map((techonology, index) => (
            <Tag name={techonology} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Technologies;
