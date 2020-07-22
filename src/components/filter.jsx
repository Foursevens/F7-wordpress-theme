import { faFilter, faTimesCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { useQueryParameter } from '../use-location';

const castArray = (value) =>
  value == null ? [] : Array.isArray(value) ? value : [value];

export function Filter({
  check,
  children,
  input,
  messagePrefix,
  taxonomies,
  taxonomyKey,
  taxonomyLabel,
}) {
  const intl = useIntl();

  const [
    selectedTaxonomyKeys,
    setSelectedTaxonomyKeys,
  ] = useQueryParameter('filter', { cast: castArray });
  const toggleTaxonomy = useCallback(
    (taxonomy) => {
      const key = taxonomy[taxonomyKey];
      const index = selectedTaxonomyKeys.indexOf(key);
      if (index === -1) {
        setSelectedTaxonomyKeys([...selectedTaxonomyKeys, key]);
      } else {
        selectedTaxonomyKeys.splice(index, 1);
        setSelectedTaxonomyKeys([...selectedTaxonomyKeys]);
      }
    },
    [selectedTaxonomyKeys, setSelectedTaxonomyKeys, taxonomyKey],
  );

  const handleClearClick = () => {
    if (selectedTaxonomyKeys.length !== 0) {
      setSelectedTaxonomyKeys([]);
    }
  };

  const filteredInput =
    selectedTaxonomyKeys.length === 0
      ? input
      : input.filter((item) => check(item, selectedTaxonomyKeys));

  const selected = filteredInput.length;
  const total = input.length;
  const areAllSelected = selected === total;
  const areNoneSelected = selectedTaxonomyKeys.length === 0;
  const areSomeSelected = selectedTaxonomyKeys.length !== 0;

  return (
    <>
      <div className="flex items-center justify-center mt-6">
        <FontAwesomeIcon
          aria-hidden
          className={classNames(
            'text-f7800',
            areNoneSelected ? 'opacity-50' : 'opacity-100',
          )}
          icon={faFilter}
          title={intl.formatMessage({ id: `${messagePrefix}.title` })}
        />
        <span className="sr-only">
          {intl.formatMessage({ id: `${messagePrefix}.description` })}
        </span>
        <ul className="inline mx-3 text-center">
          {taxonomies.map((taxonomy) => {
            const handleTaxonomyClick = () => {
              toggleTaxonomy(taxonomy);
            };
            const isActive = selectedTaxonomyKeys.includes(taxonomy.slug);
            return (
              <li key={taxonomy[taxonomyKey]} className="inline-block m-3">
                <button
                  className={classNames({
                    'bg-f7100 px-3 py-1 rounded-full': true,
                    'hover:bg-f7400': !isActive,
                    'bg-f7400': isActive,
                  })}
                  onClick={handleTaxonomyClick}
                  type="button"
                >
                  {taxonomy[taxonomyLabel]}
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className={classNames('-ml-3 p-3 text-f7800', {
            'opacity-50 cursor-default': areNoneSelected,
            'hover:text-f7400': areSomeSelected,
          })}
          onClick={handleClearClick}
          type="button"
        >
          <FontAwesomeIcon
            aria-hidden
            icon={faTimesCircle}
            title={intl.formatMessage({ id: 'general.filter.clear-title' })}
          />
          <span className="sr-only">
            {intl.formatMessage({ id: 'general.filter.clear-label' })}
          </span>
        </button>
      </div>
      <div
        className={classNames('mb-6 text-center text-xs text-f7800', {
          invisible: areAllSelected,
        })}
      >
        {'– '}
        {intl.formatMessage(
          { id: `${messagePrefix}.showing-n` },
          { selected, total },
        )}
        {' –'}
      </div>
      {children(filteredInput)}
    </>
  );
}

Filter.defaultProps = {
  taxonomyKey: 'key',
  taxonomyLabel: 'label',
};

Filter.propTypes = {
  check: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  input: PropTypes.arrayOf(PropTypes.object).isRequired,
  messagePrefix: PropTypes.string.isRequired,
  taxonomies: PropTypes.arrayOf(PropTypes.object).isRequired,
  taxonomyKey: PropTypes.string,
  taxonomyLabel: PropTypes.string,
};
