import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getData, postData, patchData, deleteData} from '../../utils/api';
import {useAccount} from '../useAccount';
import {API_CALL_LIMIT} from '../../config/constants';

const constructQueryParams = (params: any) => {
  const queryParams: Record<string, string> = {};

  // Flattening include params for population
  if (params.include) {
    Object.keys(params.include).forEach((key: string) => {
      params.include[key].forEach((field: string) => {
        if (field === '*') {
          queryParams[`populate[${key}][populate]`] = '*';
        } else {
          const index = params.include[key].indexOf(field);
          queryParams[`populate[${key}][fields][${index}]`] = field;
        }
      });
    });
  }

  if (params.filters) {
    Object.keys(params.filters).forEach((key: string) => {
      queryParams[`filters[${key}]`] = params.filters[key];
    });
  }

  return queryParams;
};

export const useGetData = (
  endpoint: string,
  params: Record<string, any> = {},
  initialPage = 1,
) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(initialPage);
  const {account} = useAccount();
  const {pageSize, ...restParams} = params;

  const fetchMoreData = async (p: number) => {
    const queryParams = constructQueryParams(restParams);
    const data = await getData(
      endpoint,
      {
        _page: p,
        _limit: pageSize ?? API_CALL_LIMIT,
        ...queryParams,
      },
      account?.jwt,
    );
    return data;
  };

  const {data, error, isLoading, isFetching, isPreviousData} = useQuery(
    [endpoint, page, params],
    () => fetchMoreData(page),
    {
      keepPreviousData: true,
      onSuccess: newData => {
        if (page > 1) {
          queryClient.setQueryData([endpoint], oldData => ({
            ...oldData,
            data: [...(oldData?.data || []), ...newData.data],
          }));
        }
      },
      onError: err => {
        console.error('Error fetching data:', err.response);
      },
    },
  );

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const refresh = () => {
    setPage(1);
    queryClient.invalidateQueries([endpoint]);
  };

  return {
    data,
    error,
    isLoading,
    isFetching,
    isPreviousData,
    loadMore,
    refresh,
  };
};

// Hook for POST requests
export const usePostData = (endpoint: string) => {
  const queryClient = useQueryClient();
  const {account} = useAccount();

  return useMutation((data: any) => postData(endpoint, data, account?.jwt), {
    onSuccess: () => {
      // Invalidate and refetch queries after a successful mutation
      queryClient.invalidateQueries([endpoint]);
    },
  });
};

// Hook for PATCH requests
export const usePatchData = (endpoint: string) => {
  const queryClient = useQueryClient();
  const {account} = useAccount();

  return useMutation(
    ({id, data}: {id: string; data: any}) =>
      patchData(`${endpoint}/${id}`, {data}, account?.jwt),
    {
      onSuccess: () => {
        // Invalidate and refetch queries after a successful mutation
        queryClient.invalidateQueries([endpoint]);
      },
      onError: error => {
        console.error('Error patching data:', error);
      },
    },
  );
};

export const useDeleteData = (endpoint: string) => {
  const queryClient = useQueryClient();
  const {account} = useAccount();

  return useMutation(
    ({id}: {id: string}) => deleteData(`${endpoint}/${id}`, account?.jwt),
    {
      onSuccess: () => {
        // Invalidate and refetch queries after a successful mutation
        queryClient.invalidateQueries([endpoint]);
      },
      onError: error => {
        console.error('Error patching data:', error);
      },
    },
  );
};
