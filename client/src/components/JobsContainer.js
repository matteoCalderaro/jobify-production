import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Job from './Job';
import Alert from './Alert';
import Loading from './Loading';
import PageBtnContainer from './PageBtnContainer';
import Wrapper from '../assets/wrappers/JobsContainer';

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    totalJobs,
    isLoading,
    page,
    searchStatus,
    searchJobType,
    sort,
    search,
    showAlert,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [page, searchStatus, searchJobType, sort, search]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 0 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
