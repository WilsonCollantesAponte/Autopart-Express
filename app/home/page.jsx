
  'use client';


// import { useState, useEffect } from 'react';
// import PaginationControls from '@/components/PaginationControls';
// import ProductsCards from '@/components/ProductsCards';
// import { parts } from '@/constants';
// import axios from 'axios';

  

// export default function Home({ searchParams }) {
//   const [page, setPage] = useState(Number(searchParams['page']) || 1);
//   const [per_page, setPerPage] = useState(Number(searchParams['per_page']) || 3);
//   const [entries, setEntries] = useState([]);
  
//   useEffect(() => {
//     // Esta función se llama cada vez que cambian page o per_page
//     const start = (page - 1) * per_page;
//     const end = start + per_page;
//     const slicedEntries = parts.slice(start, end);
//     setEntries(slicedEntries);
//   }, [page, per_page]);

//   useEffect(() => {
//     // Esta función se llama cuando cambian los valores de searchParams
//     setPage(Number(searchParams['page']) || 1);
//     setPerPage(Number(searchParams['per_page']) || 3);
//   }, [searchParams]);

//   return (
//     <div>

//       <ProductsCards entries={entries} />
//       <PaginationControls
//         hasNextPage={page * per_page < parts.length}
//         hasPrevPage={page > 1}
        
//       />

     
//     </div>
//   );
// }

import axios from 'axios';
import { useState, useEffect } from 'react';
import PaginationControls from '@/components/PaginationControls';
import ProductsCards from '@/components/ProductsCards';

export default function Home({ searchParams }) {
  const [page, setPage] = useState(Number(searchParams['page']) || 1);
  const [per_page, setPerPage] = useState(Number(searchParams['per_page']) || 3);
  const [entries, setEntries] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    axios.get('https://autopart-express.vercel.app/product/api')
    //axios.get('http://localhost:3000/product/api/')
      .then(response => {
        if (response.status === 200) {
          const data = response.data.products;
          setTotalEntries(data.length);
          const start = (page - 1) * per_page;
          const end = start + per_page;
          const slicedEntries = data.slice(start, end);
          setEntries(slicedEntries);
        } else {
          console.error('Error al obtener los datos');
        }
      })
      .catch(error => {
        console.error('Error de red:', error);
      });
  }, [page, per_page]);

  useEffect(() => {
    setPage(Number(searchParams['page']) || 1);
    setPerPage(Number(searchParams['per_page']) || 3);
  }, [searchParams]);

  return (
    <div>
      <ProductsCards entries={entries} />
      <PaginationControls
        hasNextPage={page * per_page < totalEntries}
        hasPrevPage={page > 1}
        totalEntries={totalEntries}
      />
    </div>
  );
}
