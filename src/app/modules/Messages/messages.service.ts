import QueryBuilder from '../../builder/QueryBuilder';
import { MessagesSearchableFields } from './messages.constant';
import { TMessages } from './messages.interface';
import { Messages } from './messages.model';

const createMessage = async (payload: TMessages) => {
  const result = await Messages.create(payload);
  return result;
};

const getAllMessagesFromDB = async (query: Record<string, unknown>) => {
  const messagesQuery = new QueryBuilder(
    Messages.find({ isDeleted: false }),
    query,
  )
    .search(MessagesSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await messagesQuery.modelQuery;
  const meta = await messagesQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleMessageFromDB = async (id: string) => {
  const result = await Messages.findById(id);
  return result;
};

export const MessagesServices = {
  createMessage,
  getAllMessagesFromDB,
  getSingleMessageFromDB,
};
