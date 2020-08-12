import React, { useEffect } from 'react';
import IsAuth from '../utils/hocs/IsAuth';
import { useDispatch } from 'react-redux';

import { fetchData } from '../store/actions/data';
import { useTypedSelector } from '../utils/hooks/useTypedSelector';

const Secret: React.FC = () => {
  const dispatch = useDispatch();
  const secret = useTypedSelector((state) => state.data.secret);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div>
      {secret && secret.map((user) => <div key={user.email}>{user.email}</div>)}
    </div>
  );
};

const loadData = (store: any) => {
  return store.dispatch(fetchData());
};

export default { component: IsAuth(Secret), loadData };
