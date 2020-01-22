import classNames from 'classnames';
import { useIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Image } from '../components';
import styles from './card.module.css';
import { memberShape } from './model';

export default function MemberCard({ member, shadow }) {
  const intl = useIntl();
  return (
    <div
      className={classNames(styles.cardItem, 'bg-white text-center rounded', {
        'shadow-md': shadow,
      })}
      tabIndex="0"
    >
      <div className="relative border-b-4 border-f7700">
        <Image
          alt={intl.formatMessage(
            { id: 'member.portrait-alt' },
            { name: member.title },
          )}
          file={member.fields.remotePortret}
          className={styles.img__img}
        />
        <div
          className={classNames(
            styles.img__description_layer,
            'absolute inset-0 text-white invisible opacity-0 flex justify-center items-center',
          )}
        >
          <p
            className={classNames(
              styles.img__description,
              'font-300 leading-loose text-lg',
            )}
          >
            <div dangerouslySetInnerHTML={{ __html: member.skills }} />
          </p>
        </div>
      </div>
      <div className="p-5">
        <span className="font-title font-800 text-xl uppercase">
          {member.title}
        </span>
        <h6 className="font-300">{member.function}</h6>
      </div>
    </div>
  );
}

MemberCard.defaultProps = {
  shadow: true,
};

MemberCard.propTypes = {
  member: PropTypes.shape(memberShape).isRequired,
  shadow: PropTypes.bool,
};
