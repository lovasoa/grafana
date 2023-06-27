import { DataSourceSettings } from '@grafana/data';
import { GrafanaBootConfig } from '@grafana/runtime';

import { AzureAuthSecureJSONDataType, AzureAuthJSONDataType, ConcealedSecretType } from '../types';

export const concealedSecret: ConcealedSecretType = Symbol('Concealed client secret');

export const configWithManagedIdentityEnabled: GrafanaBootConfig = {
  azure: { managedIdentityEnabled: true },
} as unknown as GrafanaBootConfig;

export const configWithManagedIdentityDisabled: GrafanaBootConfig = {
  azure: { managedIdentityEnabled: false, cloud: 'AzureCloud' },
} as unknown as GrafanaBootConfig;

export const dataSourceSettingsWithMsiCredentials: DataSourceSettings<
  AzureAuthJSONDataType,
  AzureAuthSecureJSONDataType
> = {
  jsonData: { azureCredentials: { authType: 'msi' } },
} as unknown as DataSourceSettings<AzureAuthJSONDataType, AzureAuthSecureJSONDataType>;

// Will return symbol as the secret is concealed
export const dataSourceSettingsWithClientSecretOnServer: DataSourceSettings<
  AzureAuthJSONDataType,
  AzureAuthSecureJSONDataType
> = {
  jsonData: {
    azureCredentials: {
      authType: 'clientsecret',
      tenantId: 'XXXX-tenant-id-XXXX',
      clientId: 'XXXX-client-id-XXXX',
    },
  },
  secureJsonFields: { azureClientSecret: true },
} as unknown as DataSourceSettings<AzureAuthJSONDataType, AzureAuthSecureJSONDataType>;

// Will return the secret as a string from the secureJsonData
export const dataSourceSettingsWithClientSecretInSecureJSONData: DataSourceSettings<
  AzureAuthJSONDataType,
  AzureAuthSecureJSONDataType
> = {
  jsonData: {
    azureCredentials: {
      authType: 'clientsecret',
      tenantId: 'XXXX-tenant-id-XXXX',
      clientId: 'XXXX-client-id-XXXX',
    },
  },
  secureJsonData: { azureClientSecret: 'XXXX-super-secret-secret-XXXX' },
} as unknown as DataSourceSettings<AzureAuthJSONDataType, AzureAuthSecureJSONDataType>;
