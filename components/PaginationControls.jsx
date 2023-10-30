'use client';


import { useRouter, useSearchParams } from 'next/navigation';
import { parts } from '@/constants';


const PaginationControls = ({
  hasNextPage,
  hasPrevPage,
  totalEntries
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const page = searchParams.get('page') || '1';
  const per_page = searchParams.get('per_page') || '3';
  console.log("pagination controls:", searchParams)
  return (
    
    <div className='flex gap-2  justify-center items-center'>
      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/home?page=${Number(page) - 1}&per_page=${per_page}`);
        }}>
        &lt;&lt;
      </button>

      <div>
        {page} / {Math.ceil(totalEntries / Number(per_page))}
      </div>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/home?page=${Number(page) + 1}&per_page=${per_page}`);
        }}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default PaginationControls;
