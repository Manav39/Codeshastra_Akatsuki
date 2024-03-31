import { Helmet } from 'react-helmet-async';

import strat2 from 'src/backend/strategy2';

import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  strat2();
  return (
    <>
      <Helmet>
        <title> News </title>
      </Helmet>

      <BlogView />
    </>
  );
}
