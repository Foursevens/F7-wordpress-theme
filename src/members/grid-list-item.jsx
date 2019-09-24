import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../components/image';
import styles from './grid-list-item.module.css';
import { memberShape } from './model';

export default function MembersGridListItem({ member }) {
  return (
    <div className="my-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div
        className={classNames(
          styles.cardItem,
          'min-h-full mx-3 text-center rounded shadow-md',
        )}
        tabIndex="0"
      >
        <li>
          <div className="relative border-b-4 border-f7700">
            <Image
              alt={member.title}
              file={member.fields.remote_portret}
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
                  'leading-loose text-lg font-normal',
                )}
                dangerouslySetInnerHTML={{ __html: member.skills }}
              />
            </div>
          </div>
          <div className="p-5">
            <span className="font-extrabold text-lg uppercase font-sans">
              {member.title}
            </span>
            <h6 className="leading-loose text-sm font-hairline">
              {member.function}
            </h6>
          </div>
        </li>
      </div>
    </div>
  );
}

MembersGridListItem.propTypes = {
  member: PropTypes.shape(memberShape).isRequired,
};
