import { Anchor, Center, Grid, Image, Paper, Text } from '@mantine/core';

export const About = () => {
  const teamMembers = [
    {
      name: 'Vasiliy Eliseev',
      description:
        // eslint-disable-next-line max-len
        'I have always been interested in getting into web development as I am inspired by its challenges. I am sure that with the right strategy I can succeed in this field.',
      github: 'https://github.com/vasiliyalex',
      role: 'Web Developer',
      image: '/1.jpg',
      contribution: [
        'Project environment setup',
        'Implement website Routing',
        'Created a «Detailed Product» page.',
        'Created a «Basket» page.',
        'Set up commerceTools project',
      ],
    },
    {
      name: 'Nursultan Ramazanov',
      description:
        // eslint-disable-next-line max-len
        'I am passionate about modern technologies and continuous personal growth. I strive for a successful career in my future profession, as it is more pleasant to develop in a field that I like.',

      github: 'https://github.com/qwavy',
      role: 'Web Developer',
      image: '2.jpg',
      contribution: ['Developed a secure «Login» page', 'Set up commerceTools project', 'Created a «Catalog» page'],
    },
    {
      name: 'Victor Grigorev',
      description:
        // eslint-disable-next-line max-len
        'I am a frontend developer creating user interfaces and providing user interaction using HTML, CSS and JavaScript.',

      github: 'https://github.com/grigorevvic',
      role: 'Web Developer',
      image: '3.jpg',
      contribution: [
        'Set up the repository, task board and deploy',
        'Developed a secure «Registration» page',
        'Created a visually appealing «About Us» page',
        'Created a «Profile» page',
      ],
    },
  ];

  return (
    <Center style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Text w={900} size="xl" style={{ marginTop: 20, textAlign: 'center', marginBottom: 20 }}>
        OUR TEAM
      </Text>
      <Grid gutter="md" style={{ marginBottom: 20 }}>
        {teamMembers.map((member) => (
          <Grid.Col span={4} key={member.name}>
            <Paper
              p="lg"
              shadow="lg"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#FFFFF0',
                height: '800px',
              }}
            >
              <Image
                src={member.image}
                alt={member.name}
                radius="50%"
                style={{ width: 200, height: 200, margin: '0 auto' }}
              />
              <Text w={900} size="xl" style={{ marginTop: 10, textAlign: 'center' }}>
                {member.name}
              </Text>
              <Text size="lg" w={500} style={{ marginTop: 5, textAlign: 'center' }}>
                {member.role}
              </Text>
              <Text size="sm" c="dimmed" style={{ margin: '10px 0' }}>
                {member.description}
              </Text>
              <Text size="lg" style={{ margin: '10px 0' }}>
                Contribution:
              </Text>
              <ul>
                {member.contribution.map((item) => (
                  <li>
                    <Text>- {item}</Text>
                  </li>
                ))}
              </ul>
              <Anchor href={member.github} target="_blank" c="blue" size="lg" style={{ margin: '10px 0' }}>
                GitHub Profile
              </Anchor>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
      <Anchor href="https://rs.school" target="_blank" style={{ margin: '10px 0' }}>
        <Image src="logo-rss.png" alt="logo-rss" style={{ width: 150, margin: '0 auto' }} />
      </Anchor>
      <Text size="sm" c="dimmed" style={{ margin: '10px 0' }}>
        RSSchool is an online learning community focused on web development and programming, offering well-structured
        courses for both beginners and experienced developers. Known for its high quality education, RSSchool provides a
        comprehensive program covering everything from the basics of HTML, CSS and JavaScript to advanced technologies
        like React and Node.js. The school emphasizes project-based learning, allowing students to create real-world
        projects and develop impressive portfolios RSSchool thrives on an active community of volunteers, including
        experienced developers and alumni, who mentor and support new learners.
      </Text>
    </Center>
  );
};
