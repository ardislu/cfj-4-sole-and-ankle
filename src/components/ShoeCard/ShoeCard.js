import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === 'on-sale' ? <SaleNotice>Sale</SaleNotice> : variant === 'new-release' ? <ReleaseNotice>Just Released!</ReleaseNotice> : null}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          {salePrice ? <CrossedPrice>{formatPrice(price)}</CrossedPrice> : <Price>{formatPrice(price)}</Price>}
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  max-inline-size: 340px;
`;

const Notice = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 7px 9px 9px 11px;
  color: ${COLORS.white};
  font-size: 14px;
  font-weight: ${WEIGHTS.medium};
  border-radius: 2px;
  block-size: 32px;
`

const SaleNotice = styled(Notice)`
  background: ${COLORS.primary};
`;

const ReleaseNotice = styled(Notice)`
  background: ${COLORS.secondary};
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const CrossedPrice = styled(Price)`
  color: ${COLORS.gray[700]};
  text-decoration: line-through;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
