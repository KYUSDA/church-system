import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import { BsYoutube } from 'react-icons/bs';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';

const sections = [
  { title: 'Home', url: '/' },
  { title: 'About Us', url: '/' },
  { title: 'Families', url: '/' },
  { title: 'Departments', url: '/' },
  { title: 'Gallery', url: '/gallery' }
];

const mainFeaturedPost = {
  title: 'Welcome to Nuture ,Retention & Reclamation Department',
  description:
  "Entails nuturing of those new in faith and bring back those who have backslided",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: '',
};

const featuredPosts = [
  {
    title: 'About Us ',
    description:
      'The Retention Ministry endeavors to guarantee that a new member gains a solid base on which to establish faith and keep it strong and active. The Retention Ministry exists to organize, train, inspire, and strengthen those individuals who are already within the congregation, and to assist the recently baptized to become effective members who will be permanently integrated through a personal, socio-cultural, and doctrinal relationship.',
  },
  {
    title: 'Members',
    description:
      'The department comprised of 3'
  },
];

const posts = ["efadsfasd","wrfwrf", "wfwsfs"];

const sidebar = {
  title: 'Project',
  description:
    'Follow up',
  archives: [
    { title: 'Nuture and Retention Sabbath', url: '#' },
  ],
  social: [
    { name: 'Kyusda Youtube', icon: BsYoutube },
    { name: 'Kyusda Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header  sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Depatment Gallery" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title=""
        description=""
      />
    </ThemeProvider>
  );
}