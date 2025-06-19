import triviaData from "./triviaData";
import TriviaComponent from "./triviasComponent";

type Level = 'easy' | 'medium' | 'hard';

interface TriviaPageProps {
  level: Level;
}

const TriviaProps: React.FC<TriviaPageProps> = ({ level }) => {
  // Ensure we extract only the relevant questions for the given level
  const questionsData = triviaData[level] || [];

  return <TriviaComponent level={level} questionsData={questionsData} />;
};

export default TriviaProps;
