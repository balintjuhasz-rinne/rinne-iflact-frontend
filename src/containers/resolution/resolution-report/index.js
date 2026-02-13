import React from 'react';
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import {
  RESOLUTION_TYPES,
  VOTE_STATUSES,
  VOTE_STATUSES_TITLES,
  RESOLUTIONS_STATUSES_FILTER,
  RESOLUTION_STATUSES_BACKEND,
} from '../../../constants/resolution.constants';
import { formatTimeToTimezone } from '../../../helpers/functions.helper';
import { pdfStyles } from './pdfStyling';
import { isDirectorsResolution } from '../../../helpers/resolutions.helpers';

const ResolutionReport = ({
  info: {
    id,
    status,
    name,
    type,
    description,
    company,
    cosec,
    approvalRatio,
    creationDate,
    resolveDate,
    votingEndDate,
    votingStartDate,
    documents,
    comments,
    cancelReason,
  }, cosignatories,
}) => {
  if (id) {
    Font.register({
      family: 'Inter',
      fonts: [
        { src: '/fonts/inter-v3-latin-regular.ttf' },
        { src: '/fonts/inter-v3-latin-700.ttf', fontWeight: 700 },
        { src: '/fonts/inter-v3-latin-500.ttf', fontWeight: 500 },
      ],
    });
  }

  const s = StyleSheet.create(pdfStyles);

  const sortedCosignatories = cosignatories
    ? cosignatories
      .sort((item) => (item.vote === VOTE_STATUSES.NOT_VOTED ? 1 : -1))
      .map((item) => ({
        ...item,
        comment: comments.find((el) => el.authorId === item.id) || null,
      }))
    : [];

  return (
    <PDFViewer width="100%" height="100%" style={s.viewer}>
      <Document>
        <Page style={s.page}>
          <View style={s.row}>
            <View style={s.row}>
              <Text>Resolution ID: </Text>
              <Text style={s.semi}>{id}</Text>
            </View>
            <View style={s.row}>
              <Text style={s.gray}>Status: </Text>
              <Text style={s.semi}>{RESOLUTIONS_STATUSES_FILTER[status]}</Text>
            </View>
          </View>
          <View style={s.resolutionInfo}>
            <View>
              <Text style={s.gray}>Contract Name</Text>
              <Text style={s.nameText}>{name}</Text>
            </View>
            <View style={s.type}>
              <Text style={s.gray}>Contract Type: </Text>
              <Text>{RESOLUTION_TYPES[type]?.title}</Text>
            </View>
            {description ? (
              <View>
                <Text style={s.description}>{description}</Text>
              </View>
            ) : null}
          </View>
          <View style={s.additionalInfo}>
            <View style={s.additionalRow}>
              <Text style={s.gray}>Company Name: </Text>
              <Text style={[s.semi, s.additionalText]}>{company?.name}</Text>
            </View>
            <View style={s.additionalRow}>
              <Text style={s.gray}>Company Registration No.: </Text>
              <Text style={s.semi}>{company?.registrationNumber}</Text>
            </View>
            <View style={s.additionalRow}>
              <Text style={s.gray}>Created by: </Text>
              <Text style={s.semi}>
                {cosec?.name} {cosec?.surname ?? ''}
              </Text>
            </View>
            <View style={s.additionalRow}>
              <Text style={s.gray}>Required Approval Ratio: </Text>
              <Text style={s.semi}>
                {approvalRatio ? `${approvalRatio}%` : ''}
              </Text>
            </View>
          </View>
          {!!cancelReason && RESOLUTION_STATUSES_BACKEND.Canceled === status && (
            <View style={s.cancellation}>
              <Text style={[s.cancellationTitle, s.gray]}>Reason of Cancellation:</Text>
              <Text style={s.cancellationText}>{cancelReason}</Text>
            </View>
          )}
          <View style={s.dateBlock}>
            <View style={s.date}>
              <Text style={[s.dateName, s.gray]}>Date of Creation</Text>
              <Text style={s.semi}>
                {formatTimeToTimezone(creationDate, 'DD MMMM YYYY')}
              </Text>
            </View>
            <View style={s.date}>
              <Text style={[s.dateName, s.gray]}>Contract Date</Text>
              <Text style={s.semi}>
                {formatTimeToTimezone(votingStartDate, 'DD MMMM YYYY')}
              </Text>
            </View>
            <View style={s.date}>
              <Text style={[s.dateName, s.gray]}>Deferred Payment Date</Text>
              <Text style={s.semi}>
                {formatTimeToTimezone(votingEndDate, 'DD MMMM YYYY')}
              </Text>
            </View>
            {resolveDate !== '0001-01-01T00:00:00Z' ? (
              <View style={s.date}>
                <Text style={[s.dateName, s.gray]}>
                  Date of Acceptance or Closure
                </Text>
                <Text style={s.semi}>
                  {formatTimeToTimezone(resolveDate, 'DD MMMM YYYY, hh:mm aa')}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={s.attached}>
            <Text style={s.gray}>Attached Documents</Text>
            {documents?.map((item) => (
              <View style={s.attachedRow}>
                <Text key={item.id} style={s.semi}>
                  {item.originalName}&nbsp;
                </Text>
                <Text key={item.id} style={s.gray}>
                  {item.size}
                </Text>
              </View>
            ))}
          </View>
          <View style={s.voting}>
            <Text style={[s.semi, s.votingTitle]}>Voting Details</Text>
            <View fixed style={s.votingHeader}>
              <Text style={[s.gray, s.votingName]}>Full name</Text>
              <Text style={[s.gray, s.votingDate]}>Approval Date and Time</Text>
              <Text style={[s.gray, s.votingValue]}>Voting Power</Text>
              <Text style={[s.gray, s.votingStatus]}>Vote Status</Text>
            </View>
            {sortedCosignatories?.map(
              ({
                id: key,
                name: username,
                surname,
                votingValue,
                voteDate,
                vote,
                comment,
              }) => (
                <View wrap={false} style={s.votingWrap} key={key}>
                  <View style={s.votingRow}>
                    <Text style={s.votingName}>
                      {username} {surname ?? ''}
                    </Text>
                    <Text style={s.votingDate}>
                      {voteDate
                        ? formatTimeToTimezone(voteDate, 'MMM DD YYYY HH:mm:ss')
                        : '-'}
                    </Text>
                    <Text style={s.votingValue}>
                      {votingValue && !isDirectorsResolution(type)
                        ? `${votingValue}%`
                        : '-'}
                    </Text>
                    <Text style={s.votingStatus}>
                      {VOTE_STATUSES_TITLES[vote]}
                    </Text>
                  </View>
                  {comment ? <Text style={s.comment}>{comment.text}</Text> : null}
                </View>
              ),
            )}
          </View>
          <View fixed style={s.bottom}>
            <Text style={[s.gray, s.generation]}>
              Report generation date and time:{' '}
              {formatTimeToTimezone(new Date(), 'DD MMMM YYYY, hh:mm aa')}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

ResolutionReport.propTypes = {
  info: PropTypes.object.isRequired,
  cosignatories: PropTypes.array.isRequired,
};

export default ResolutionReport;
