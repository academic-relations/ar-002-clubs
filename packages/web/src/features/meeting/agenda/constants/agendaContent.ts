import { AgendaTypeEnum } from "./agendaType";

interface AgendaContent {
  type: AgendaTypeEnum;
  title?: string;
  content?: string;
}

export default AgendaContent;
