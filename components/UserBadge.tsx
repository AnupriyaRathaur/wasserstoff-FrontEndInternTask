type Props = {
  name: string;
  color: string;
};

const UserBadge: React.FC<Props> = ({ name, color }) => {
  return (
    <span className={`px-3 py-1 rounded-lg bg-gray-100 border ${color} font-semibold`}>
      👤 {name}
    </span>
  );
};

export default UserBadge;