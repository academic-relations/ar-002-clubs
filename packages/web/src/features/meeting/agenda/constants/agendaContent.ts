import { AgendaTypeEnum } from "./agendaType";

// TODO: Constructor
class AgendaContent {
  type: AgendaTypeEnum = AgendaTypeEnum.Bogo;

  title: string = "";

  content: string = "";
}

export default AgendaContent;
