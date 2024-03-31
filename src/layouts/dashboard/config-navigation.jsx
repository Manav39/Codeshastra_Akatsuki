import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Portfolio',
    path: '/portfolio',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Trades',
    path: '/trades',
    icon: icon('ic_user'),
  },
  {
    title: 'Watchlist',
    path: '/watchlist',
    icon: icon('ic_user'),
  },
  {
    title: 'Explore',
    path: '/explore',
    icon: icon('ic_cart'),
  },
  {
    title: 'News',
    path: '/news',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Add Cash',
    path: '/add',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
