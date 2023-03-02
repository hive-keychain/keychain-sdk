import { Container, ListGroup, Image } from 'react-bootstrap';
import HiveLogoSvg from '../assets/images/svgs/hive.svg';
import DiscordLogoSvg from '../assets/images/svgs/discord.svg';
import TwitterLogoSvg from '../assets/images/svgs/twitter.svg';

type Props = {};

export default function FooterComponent({}: Props) {
  return (
    <Container className="d-flex justify-content-center bottom-0 mt-5">
      <ListGroup className="d-flex justify-content-center">
        <ListGroup.Item action href={'https://hive-keychain.com/'}>
          Made with ❤ by Keychain Team
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-center">
          <ListGroup horizontal>
            <ListGroup.Item action href={'https://hive.blog/@keychain'}>
              <Image src={HiveLogoSvg} width={20} />
            </ListGroup.Item>
            <ListGroup.Item
              action
              href={'https://discord.com/invite/E6P6Gjv9MC'}>
              <Image src={DiscordLogoSvg} width={20} />
            </ListGroup.Item>
            <ListGroup.Item action href={'https://twitter.com/HiveKeychain'}>
              <Image src={TwitterLogoSvg} width={20} />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
