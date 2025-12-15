/**
 * TeamSection Component
 *
 * @description Team members showcase section with member cards.
 * @author DevToolsB Team
 */

import SectionHeader from "./../../../../Components/other/SectionHeader";
import TeamMemberCard from "./TeamMemberCard";
import { teamData } from "./../../../../demoData/teamData";

const TeamSection = () => {
  return (
    <section
      id="team"
      className="py-20 px-4 mobile:px-6 tablet:px-8 laptop:px-10 desktop:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Meet Our Team"
          subtitle="The talented individuals behind DevToolsB"
        />

        <div className="grid grid-cols-1 mobile:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamData.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
