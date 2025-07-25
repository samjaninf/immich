import { SqlTransformer } from 'src/sql-tools/transformers/types';
import { DatabaseParameter } from 'src/sql-tools/types';

export const transformParameters: SqlTransformer = (ctx, item) => {
  switch (item.type) {
    case 'ParameterSet': {
      return asParameterSet(item.parameter);
    }

    case 'ParameterReset': {
      return asParameterReset(item.databaseName, item.parameterName);
    }

    default: {
      return false;
    }
  }
};

const asParameterSet = (parameter: DatabaseParameter): string => {
  let sql = '';
  if (parameter.scope === 'database') {
    sql += `ALTER DATABASE "${parameter.databaseName}" `;
  }

  sql += `SET ${parameter.name} TO ${parameter.value}`;

  return sql;
};

const asParameterReset = (databaseName: string, parameterName: string): string => {
  return `ALTER DATABASE "${databaseName}" RESET "${parameterName}"`;
};
