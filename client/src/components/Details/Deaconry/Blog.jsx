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
import Deac from '../../../assets/deaconry.jpeg'
const sections = [
  { title: 'Home', url: '/' },
  { title: 'About Us', url: '/' },
  { title: 'Families', url: '/' },
  { title: 'Departments', url: '/' },
];

const mainFeaturedPost = {
  title: 'Welcome to Deaconry Department',
  description:
    "We welcome you to kyusda",
  image: Deac,
  imageText: 'main image description',
  linkText: '',
};

const featuredPosts = [
  {
    title: 'About Us ',
    description:
      'The New Testament identifies the office of deacon with the Greek word diakonos, from which the English “deacon” is derived. The Greek word is variously interpreted as “servant, minister, writer, attendant” and in Christian circles has acquired the specialized meaning now attached to “deacon.',
  },
  {
    title: 'Members',
    description:
      'Headed by George Ratemo',
 
  },
];

const posts = ["efadsfasd","wrfwrf", "wfwsfs"];

const sidebar = {
  title: 'Project',
  description:
    'Church sufurias',
  archives: [
    { title: 'Coming soon', url: '#' },
  ],
  social: [
    { name: 'Kyusda Youtube', icon: BsYoutube  , link:'https://www.youtube.com/channel/UCe6xeVkEBvG7OD_9HltS1xQ'},
    { name: 'Kyusda Facebook', icon: FacebookIcon  , link:'https://www.facebook.com/profile.php?id=100083015178066'},
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