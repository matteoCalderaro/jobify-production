import { useAppContext } from '../../context/appContext';
import { ChartsContainer, StatsContainer, Loading } from '../../components';
import { useEffect } from 'react';

const Stats = () => {
  const { showStats, monthlyApplications, isLoading } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Stats;
