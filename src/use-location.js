import queryString from 'query-string';
import { useEffect, useState } from 'react';

import { useClientSide } from './use-client-side';

/**
 * @return {[string, function]}
 */
export function useLocation() {
  const [location, setLocation] = useState(null);
  const isClientSide = useClientSide();
  useEffect(() => {
    if (isClientSide) {
      setLocation(window.location.href);
    }
  }, [isClientSide, setLocation]);
  useEffect(() => {
    window.history.replaceState({}, '', location);
  }, [location]);
  return [
    location,
    function setNewLocation(newLocation) {
      if (newLocation) {
        setLocation(newLocation);
      }
    },
  ];
}

/**
 * @return {[{ query: object, url: string }, function]}
 */
export function useParsedLocation() {
  const [location, setLocation] = useLocation();
  const [parsedLocation, setParsedLocation] = useState({
    query: {},
    url: null,
  });
  useEffect(() => {
    if (location != null) {
      setParsedLocation(queryString.parseUrl(location));
    }
  }, [location]);
  useEffect(() => {
    if (parsedLocation.url != null) {
      setLocation(queryString.stringifyUrl(parsedLocation));
    }
  }, [parsedLocation, setLocation]);
  return [parsedLocation, setParsedLocation];
}

/**
 * @return {[object, function]}
 */
export function useParsedQueryString() {
  const [{ query, url }, setParsedLocation] = useParsedLocation();
  return [
    query,
    function setQueryString(newQueryString) {
      setParsedLocation({ query: newQueryString, url });
    },
  ];
}

/**
 * @param {string} key
 * @param {object} [options]
 * @param {function} [options.cast]
 * @return {[any, function]}
 */
export function useQueryParameter(key, { cast } = {}) {
  const [parsedQueryString, setParsedQueryString] = useParsedQueryString();
  const value = parsedQueryString[key];
  return [
    cast == null ? value : cast(value),
    function setQueryParameterValue(newValue) {
      setParsedQueryString({
        ...parsedQueryString,
        [key]: newValue,
      });
    },
  ];
}
