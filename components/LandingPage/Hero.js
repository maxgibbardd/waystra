import React from 'react';
import styled from 'styled-components';

const Hero = () => {
  return (
    <Section>
      <Overlay>
        <Container>

          {/* HEADER & SUBHEADER */}
          <HeroTextColumn>
            <Header>Waystra</Header>
            <SubheaderAndStarsColumn>
              <SubHeader>Find your way quickly and easily with our AI-powered travel assistance.</SubHeader>
            </SubheaderAndStarsColumn>
          </HeroTextColumn>

          {/* BULLET POINTS & IMAGES */}
          <BulletsAndImages>
            <BulletColumn>

              {/* BULLET POINT 1 */}
              <Step>
                <Bullet>
                  <BulletPoint>1</BulletPoint>
                  <BulletText>
                    Browse
                  </BulletText>
                </Bullet>
                <SubBullet>
                  • Search Destinations
                </SubBullet>
              </Step>

              {/* BULLET POINT 2 */}
              <Step>
                <Bullet>
                  <BulletPoint>2</BulletPoint>
                  <BulletText>
                    Plan
                  </BulletText>
                </Bullet>
                <SubBullet>
                  • Plan your route
                </SubBullet>
              </Step>

              {/* BULLET POINT 3 */}
              <Step>
                <Bullet>
                  <BulletPoint>3</BulletPoint>
                  <BulletText>
                    Travel
                  </BulletText>
                </Bullet>
                <SubBullet>
                  • Travel with ease :)
                </SubBullet>
              </Step>
            </BulletColumn>
            <ImagesColumn>
              <ImageRow>
                <ImageContainer>
                  {/* <img src='/Number_1.avif'></img> */}
                </ImageContainer>
              </ImageRow>
              <ImageRow>
                <ImageContainer>
                  {/* <img src='/Number_2.jpg'></img> */}
                </ImageContainer>
              </ImageRow>
              <ImageRow>
                <ImageContainer>
                  {/* <img src='/Number_3.jpg'></img> */}
                </ImageContainer>
              </ImageRow>
            </ImagesColumn>
          </BulletsAndImages>
        </Container>
      </Overlay>
    </Section>
  );
};

const Section = styled.section`
height: 94vh;
margin-top: 6vh;
padding: 10px;
border-radius: 10px;
// border: 1px solid red;
`;

const Overlay = styled.div`
padding: 10px;
border-radius: 10px;
// border: 1px solid orange;
`;

const Container = styled.div`
padding: 10px;
border-radius: 10px;
// border: 1px solid yellow;
`;


/* ~~~~~~~~~~~~~~~~ HEADER & SUBHEADER ~~~~~~~~~~~~~~~~ */

const HeroTextColumn = styled.div`
padding: 10px;
border-radius: 10px;
// border: 1px solid green;
color: var(--prm-light);
`;

const Header = styled.div`
font-family: var(--font-prm);
display: flex;
font-size: 100px;
font-weight: 700;
`

const SubHeader = styled.h2`
display: flex;
font-size: 22px;
font-weight: 500;
font-family: var(--font-prm);
`;

const SubheaderAndStarsColumn = styled.div`

`;


/* ~~~~~~~~~~~~~~~~ BULLET POINTS & IMAGES ~~~~~~~~~~~~~~~~ */

const BulletsAndImages = styled.div`
display: flex;
padding: 10px;
border-radius: 10px;
// border: 1px solid blue;
`

/* BULLETS */
const BulletColumn = styled.div`
flex: 2;
padding: 10px;
padding-left: 50px;
border-radius: 10px;
// border: 1px solid indigo;
font-family: var(--font-scnd);
`

const Step = styled.div`
padding: 10px;
border-radius: 10px;
// border: 1px solid black;
// display: flex
width: 100%;
`

const Bullet = styled.div`
width: 100%;
display: flex;
align-items: center;
gap: 8px;
// border: 1px solid black;
`

const SubBullet = styled.div`
width: 100%;
display: flex;
align-items: center;
padding-left: 70px;
gap: 8px;
font-size: 20px;
// border: 1px solid black;
`

const BulletPoint = styled.span`
display: flex;
align-items: center;
justify-content: center;
width: 30px;
height: 100%;
border-radius: 10px;
// border: 1px solid black;
color: var(--ac-light);
font-size: 50px;
font-weight: 600;
padding: 0;
`

const BulletText = styled.span`
font-size: 30px;
border-radius: 10px;
// border: 1px solid black;
padding: 5px 10px;
`

/* IMAGES */
const ImagesColumn = styled.div`
flex: 3;
padding: 10px;
border-radius: 10px;
border: 1px solid black;
display: flex
`

const ImageRow = styled.div`
  height: 100%;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  
  &:nth-child(1) {
    flex: 1;
    justify-content: flex-start;
  }

  &:nth-child(2) {
    flex: 1;
    justify-content: center;
  }

  &:nth-child(3) {
    flex: 1;
    justify-content: flex-end;
  }
`;

const ImageContainer = styled.div`
width: 100%;
border-radius: 10px;
border: 1px solid var(--prm-light);
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;




export default Hero;
