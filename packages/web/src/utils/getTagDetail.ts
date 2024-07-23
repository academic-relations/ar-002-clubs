import { TagColor } from "../common/components/Tag";

interface StatusDetail {
  text: string;
  color: TagColor;
}

const getTagDetail = <T extends number>(
  status: T,
  enumDictionary: {
    [key in T]: StatusDetail;
  },
): StatusDetail => enumDictionary[status] || { text: "None", color: "GRAY" };

export { getTagDetail };
export type { StatusDetail };
