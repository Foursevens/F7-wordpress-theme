import { object, shape, string } from 'prop-types';

export const imageModel = shape({ childImageSharp: object });

export const locationShape = shape({
  pathname: string,
});
