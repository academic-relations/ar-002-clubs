import { ApiAct001RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";
import { ApiAct002ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct002";
import { ApiAct003RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct003";

import { ActivityReportFormData } from "../types/form";

export const transformFromApiAct002Response = (
  response: ApiAct002ResponseOk,
): ActivityReportFormData => ({
  name: response.name,
  activityTypeEnumId: response.activityTypeEnumId,
  durations: response.durations,
  location: response.location,
  purpose: response.purpose,
  detail: response.detail,
  evidence: response.evidence,
  evidenceFiles: response.evidenceFiles.map(file => ({
    id: file.fileId,
    name: file.name,
    url: file.url,
  })),
  participants: response.participants.map(participant => ({
    id: participant.studentId,
    studentNumber: participant.studentNumber,
    name: participant.name,
  })),
});

export const transformToApiAct001RequestBody = (
  formData: ActivityReportFormData,
  clubId: number,
): ApiAct001RequestBody => ({
  clubId,
  name: formData.name,
  activityTypeEnumId: formData.activityTypeEnumId,
  duration: formData.durations,
  location: formData.location,
  purpose: formData.purpose,
  detail: formData.detail,
  evidence: formData.evidence,
  evidenceFiles: formData.evidenceFiles.map(file => ({
    uid: file.id,
  })),
  participants: formData.participants.map(participant => ({
    studentId: participant.id,
  })),
});

export const transformToApiAct003RequestBody = (
  formData: ActivityReportFormData,
): ApiAct003RequestBody => ({
  name: formData.name,
  activityTypeEnumId: formData.activityTypeEnumId,
  durations: formData.durations,
  location: formData.location,
  purpose: formData.purpose,
  detail: formData.detail,
  evidence: formData.evidence,
  evidenceFiles: formData.evidenceFiles.map(file => ({
    fileId: file.id,
  })),
  participants: formData.participants.map(participant => ({
    studentId: participant.id,
  })),
});
