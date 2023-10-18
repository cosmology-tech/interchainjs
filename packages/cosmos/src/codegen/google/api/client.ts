import { LaunchStage, launchStageFromJSON, launchStageToJSON } from "./launch_stage";
import { Duration, DurationAmino } from "../protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { isSet, DeepPartial, isObject } from "../../helpers";
/**
 * The organization for which the client libraries are being published.
 * Affects the url where generated docs are published, etc.
 */
export enum ClientLibraryOrganization {
  /** CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED - Not useful. */
  CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED = 0,
  /** CLOUD - Google Cloud Platform Org. */
  CLOUD = 1,
  /** ADS - Ads (Advertising) Org. */
  ADS = 2,
  /** PHOTOS - Photos Org. */
  PHOTOS = 3,
  /** STREET_VIEW - Street View Org. */
  STREET_VIEW = 4,
  UNRECOGNIZED = -1,
}
export const ClientLibraryOrganizationAmino = ClientLibraryOrganization;
export function clientLibraryOrganizationFromJSON(object: any): ClientLibraryOrganization {
  switch (object) {
    case 0:
    case "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED":
      return ClientLibraryOrganization.CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED;
    case 1:
    case "CLOUD":
      return ClientLibraryOrganization.CLOUD;
    case 2:
    case "ADS":
      return ClientLibraryOrganization.ADS;
    case 3:
    case "PHOTOS":
      return ClientLibraryOrganization.PHOTOS;
    case 4:
    case "STREET_VIEW":
      return ClientLibraryOrganization.STREET_VIEW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClientLibraryOrganization.UNRECOGNIZED;
  }
}
export function clientLibraryOrganizationToJSON(object: ClientLibraryOrganization): string {
  switch (object) {
    case ClientLibraryOrganization.CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED:
      return "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED";
    case ClientLibraryOrganization.CLOUD:
      return "CLOUD";
    case ClientLibraryOrganization.ADS:
      return "ADS";
    case ClientLibraryOrganization.PHOTOS:
      return "PHOTOS";
    case ClientLibraryOrganization.STREET_VIEW:
      return "STREET_VIEW";
    case ClientLibraryOrganization.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** To where should client libraries be published? */
export enum ClientLibraryDestination {
  /**
   * CLIENT_LIBRARY_DESTINATION_UNSPECIFIED - Client libraries will neither be generated nor published to package
   * managers.
   */
  CLIENT_LIBRARY_DESTINATION_UNSPECIFIED = 0,
  /**
   * GITHUB - Generate the client library in a repo under github.com/googleapis,
   * but don't publish it to package managers.
   */
  GITHUB = 10,
  /** PACKAGE_MANAGER - Publish the library to package managers like nuget.org and npmjs.com. */
  PACKAGE_MANAGER = 20,
  UNRECOGNIZED = -1,
}
export const ClientLibraryDestinationAmino = ClientLibraryDestination;
export function clientLibraryDestinationFromJSON(object: any): ClientLibraryDestination {
  switch (object) {
    case 0:
    case "CLIENT_LIBRARY_DESTINATION_UNSPECIFIED":
      return ClientLibraryDestination.CLIENT_LIBRARY_DESTINATION_UNSPECIFIED;
    case 10:
    case "GITHUB":
      return ClientLibraryDestination.GITHUB;
    case 20:
    case "PACKAGE_MANAGER":
      return ClientLibraryDestination.PACKAGE_MANAGER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClientLibraryDestination.UNRECOGNIZED;
  }
}
export function clientLibraryDestinationToJSON(object: ClientLibraryDestination): string {
  switch (object) {
    case ClientLibraryDestination.CLIENT_LIBRARY_DESTINATION_UNSPECIFIED:
      return "CLIENT_LIBRARY_DESTINATION_UNSPECIFIED";
    case ClientLibraryDestination.GITHUB:
      return "GITHUB";
    case ClientLibraryDestination.PACKAGE_MANAGER:
      return "PACKAGE_MANAGER";
    case ClientLibraryDestination.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Required information for every language. */
export interface CommonLanguageSettings {
  /**
   * Link to automatically generated reference documentation.  Example:
   * https://cloud.google.com/nodejs/docs/reference/asset/latest
   */
  /** @deprecated */
  referenceDocsUri: string;
  /** The destination where API teams want this client library to be published. */
  destinations: ClientLibraryDestination[];
}
export interface CommonLanguageSettingsProtoMsg {
  typeUrl: "/google.api.CommonLanguageSettings";
  value: Uint8Array;
}
/** Required information for every language. */
export interface CommonLanguageSettingsAmino {
  /**
   * Link to automatically generated reference documentation.  Example:
   * https://cloud.google.com/nodejs/docs/reference/asset/latest
   */
  /** @deprecated */
  reference_docs_uri: string;
  /** The destination where API teams want this client library to be published. */
  destinations: ClientLibraryDestination[];
}
export interface CommonLanguageSettingsAminoMsg {
  type: "/google.api.CommonLanguageSettings";
  value: CommonLanguageSettingsAmino;
}
/** Details about how and where to publish client libraries. */
export interface ClientLibrarySettings {
  /** Version of the API to apply these settings to. */
  version: string;
  /** Launch stage of this version of the API. */
  launchStage: LaunchStage;
  /**
   * When using transport=rest, the client request will encode enums as
   * numbers rather than strings.
   */
  restNumericEnums: boolean;
  /** Settings for legacy Java features, supported in the Service YAML. */
  javaSettings: JavaSettings;
  /** Settings for C++ client libraries. */
  cppSettings: CppSettings;
  /** Settings for PHP client libraries. */
  phpSettings: PhpSettings;
  /** Settings for Python client libraries. */
  pythonSettings: PythonSettings;
  /** Settings for Node client libraries. */
  nodeSettings: NodeSettings;
  /** Settings for .NET client libraries. */
  dotnetSettings: DotnetSettings;
  /** Settings for Ruby client libraries. */
  rubySettings: RubySettings;
  /** Settings for Go client libraries. */
  goSettings: GoSettings;
}
export interface ClientLibrarySettingsProtoMsg {
  typeUrl: "/google.api.ClientLibrarySettings";
  value: Uint8Array;
}
/** Details about how and where to publish client libraries. */
export interface ClientLibrarySettingsAmino {
  /** Version of the API to apply these settings to. */
  version: string;
  /** Launch stage of this version of the API. */
  launch_stage: LaunchStage;
  /**
   * When using transport=rest, the client request will encode enums as
   * numbers rather than strings.
   */
  rest_numeric_enums: boolean;
  /** Settings for legacy Java features, supported in the Service YAML. */
  java_settings?: JavaSettingsAmino;
  /** Settings for C++ client libraries. */
  cpp_settings?: CppSettingsAmino;
  /** Settings for PHP client libraries. */
  php_settings?: PhpSettingsAmino;
  /** Settings for Python client libraries. */
  python_settings?: PythonSettingsAmino;
  /** Settings for Node client libraries. */
  node_settings?: NodeSettingsAmino;
  /** Settings for .NET client libraries. */
  dotnet_settings?: DotnetSettingsAmino;
  /** Settings for Ruby client libraries. */
  ruby_settings?: RubySettingsAmino;
  /** Settings for Go client libraries. */
  go_settings?: GoSettingsAmino;
}
export interface ClientLibrarySettingsAminoMsg {
  type: "/google.api.ClientLibrarySettings";
  value: ClientLibrarySettingsAmino;
}
/**
 * This message configures the settings for publishing [Google Cloud Client
 * libraries](https://cloud.google.com/apis/docs/cloud-client-libraries)
 * generated from the service config.
 */
export interface Publishing {
  /**
   * A list of API method settings, e.g. the behavior for methods that use the
   * long-running operation pattern.
   */
  methodSettings: MethodSettings[];
  /**
   * Link to a place that API users can report issues.  Example:
   * https://issuetracker.google.com/issues/new?component=190865&template=1161103
   */
  newIssueUri: string;
  /**
   * Link to product home page.  Example:
   * https://cloud.google.com/asset-inventory/docs/overview
   */
  documentationUri: string;
  /**
   * Used as a tracking tag when collecting data about the APIs developer
   * relations artifacts like docs, packages delivered to package managers,
   * etc.  Example: "speech".
   */
  apiShortName: string;
  /** GitHub label to apply to issues and pull requests opened for this API. */
  githubLabel: string;
  /**
   * GitHub teams to be added to CODEOWNERS in the directory in GitHub
   * containing source code for the client libraries for this API.
   */
  codeownerGithubTeams: string[];
  /**
   * A prefix used in sample code when demarking regions to be included in
   * documentation.
   */
  docTagPrefix: string;
  /** For whom the client library is being published. */
  organization: ClientLibraryOrganization;
  /**
   * Client library settings.  If the same version string appears multiple
   * times in this list, then the last one wins.  Settings from earlier
   * settings with the same version string are discarded.
   */
  librarySettings: ClientLibrarySettings[];
}
export interface PublishingProtoMsg {
  typeUrl: "/google.api.Publishing";
  value: Uint8Array;
}
/**
 * This message configures the settings for publishing [Google Cloud Client
 * libraries](https://cloud.google.com/apis/docs/cloud-client-libraries)
 * generated from the service config.
 */
export interface PublishingAmino {
  /**
   * A list of API method settings, e.g. the behavior for methods that use the
   * long-running operation pattern.
   */
  method_settings: MethodSettingsAmino[];
  /**
   * Link to a place that API users can report issues.  Example:
   * https://issuetracker.google.com/issues/new?component=190865&template=1161103
   */
  new_issue_uri: string;
  /**
   * Link to product home page.  Example:
   * https://cloud.google.com/asset-inventory/docs/overview
   */
  documentation_uri: string;
  /**
   * Used as a tracking tag when collecting data about the APIs developer
   * relations artifacts like docs, packages delivered to package managers,
   * etc.  Example: "speech".
   */
  api_short_name: string;
  /** GitHub label to apply to issues and pull requests opened for this API. */
  github_label: string;
  /**
   * GitHub teams to be added to CODEOWNERS in the directory in GitHub
   * containing source code for the client libraries for this API.
   */
  codeowner_github_teams: string[];
  /**
   * A prefix used in sample code when demarking regions to be included in
   * documentation.
   */
  doc_tag_prefix: string;
  /** For whom the client library is being published. */
  organization: ClientLibraryOrganization;
  /**
   * Client library settings.  If the same version string appears multiple
   * times in this list, then the last one wins.  Settings from earlier
   * settings with the same version string are discarded.
   */
  library_settings: ClientLibrarySettingsAmino[];
}
export interface PublishingAminoMsg {
  type: "/google.api.Publishing";
  value: PublishingAmino;
}
export interface JavaSettings_ServiceClassNamesEntry {
  key: string;
  value: string;
}
export interface JavaSettings_ServiceClassNamesEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface JavaSettings_ServiceClassNamesEntryAmino {
  key: string;
  value: string;
}
export interface JavaSettings_ServiceClassNamesEntryAminoMsg {
  type: string;
  value: JavaSettings_ServiceClassNamesEntryAmino;
}
/** Settings for Java client libraries. */
export interface JavaSettings {
  /**
   * The package name to use in Java. Clobbers the java_package option
   * set in the protobuf. This should be used **only** by APIs
   * who have already set the language_settings.java.package_name" field
   * in gapic.yaml. API teams should use the protobuf java_package option
   * where possible.
   * 
   * Example of a YAML configuration::
   * 
   *  publishing:
   *    java_settings:
   *      library_package: com.google.cloud.pubsub.v1
   */
  libraryPackage: string;
  /**
   * Configure the Java class name to use instead of the service's for its
   * corresponding generated GAPIC client. Keys are fully-qualified
   * service names as they appear in the protobuf (including the full
   * the language_settings.java.interface_names" field in gapic.yaml. API
   * teams should otherwise use the service name as it appears in the
   * protobuf.
   * 
   * Example of a YAML configuration::
   * 
   *  publishing:
   *    java_settings:
   *      service_class_names:
   *        - google.pubsub.v1.Publisher: TopicAdmin
   *        - google.pubsub.v1.Subscriber: SubscriptionAdmin
   */
  serviceClassNames: {
    [key: string]: string;
  };
  /** Some settings. */
  common: CommonLanguageSettings;
}
export interface JavaSettingsProtoMsg {
  typeUrl: "/google.api.JavaSettings";
  value: Uint8Array;
}
/** Settings for Java client libraries. */
export interface JavaSettingsAmino {
  /**
   * The package name to use in Java. Clobbers the java_package option
   * set in the protobuf. This should be used **only** by APIs
   * who have already set the language_settings.java.package_name" field
   * in gapic.yaml. API teams should use the protobuf java_package option
   * where possible.
   * 
   * Example of a YAML configuration::
   * 
   *  publishing:
   *    java_settings:
   *      library_package: com.google.cloud.pubsub.v1
   */
  library_package: string;
  /**
   * Configure the Java class name to use instead of the service's for its
   * corresponding generated GAPIC client. Keys are fully-qualified
   * service names as they appear in the protobuf (including the full
   * the language_settings.java.interface_names" field in gapic.yaml. API
   * teams should otherwise use the service name as it appears in the
   * protobuf.
   * 
   * Example of a YAML configuration::
   * 
   *  publishing:
   *    java_settings:
   *      service_class_names:
   *        - google.pubsub.v1.Publisher: TopicAdmin
   *        - google.pubsub.v1.Subscriber: SubscriptionAdmin
   */
  service_class_names: {
    [key: string]: string;
  };
  /** Some settings. */
  common?: CommonLanguageSettingsAmino;
}
export interface JavaSettingsAminoMsg {
  type: "/google.api.JavaSettings";
  value: JavaSettingsAmino;
}
/** Settings for C++ client libraries. */
export interface CppSettings {
  /** Some settings. */
  common: CommonLanguageSettings;
}
export interface CppSettingsProtoMsg {
  typeUrl: "/google.api.CppSettings";
  value: Uint8Array;
}
/** Settings for C++ client libraries. */
export interface CppSettingsAmino {
  /** Some settings. */
  common?: CommonLanguageSettingsAmino;
}
export interface CppSettingsAminoMsg {
  type: "/google.api.CppSettings";
  value: CppSettingsAmino;
}
/** Settings for Php client libraries. */
export interface PhpSettings {
  /** Some settings. */
  common: CommonLanguageSettings;
}
export interface PhpSettingsProtoMsg {
  typeUrl: "/google.api.PhpSettings";
  value: Uint8Array;
}
/** Settings for Php client libraries. */
export interface PhpSettingsAmino {
  /** Some settings. */
  common?: CommonLanguageSettingsAmino;
}
export interface PhpSettingsAminoMsg {
  type: "/google.api.PhpSettings";
  value: PhpSettingsAmino;
}
/** Settings for Python client libraries. */
export interface PythonSettings {
  /** Some settings. */
  common: CommonLanguageSettings;
}
export interface PythonSettingsProtoMsg {
  typeUrl: "/google.api.PythonSettings";
  value: Uint8Array;
}
/** Settings for Python client libraries. */
export interface PythonSettingsAmino {
  /** Some settings. */
  common?: CommonLanguageSettingsAmino;
}
export interface PythonSettingsAminoMsg {
  type: "/google.api.PythonSettings";
  value: PythonSettingsAmino;
}
/** Settings for Node client libraries. */
export interface NodeSettings {
  /** Some settings. */
  common: CommonLanguageSettings;
}
export interface NodeSettingsProtoMsg {
  typeUrl: "/google.api.NodeSettings";
  value: Uint8Array;
}
/** Settings for Node client libraries. */
export interface NodeSettingsAmino {
  /** Some settings. */
  common?: CommonLanguageSettingsAmino;
}
export interface NodeSettingsAminoMsg {
  type: "/google.api.NodeSettings";
  value: NodeSettingsAmino;
}
/** Settings for Dotnet client libraries. */
export interface DotnetSettings {
  /** Some settings. */
  common: CommonLanguageSettings;
}
export interface DotnetSettingsProtoMsg {
  typeUrl: "/google.api.DotnetSettings";
  value: Uint8Array;
}
/** Settings for Dotnet client libraries. */
export interface DotnetSettingsAmino {
  /** Some settings. */
  common?: CommonLanguageSettingsAmino;
}
export interface DotnetSettingsAminoMsg {
  type: "/google.api.DotnetSettings";
  value: DotnetSettingsAmino;
}
/** Settings for Ruby client libraries. */
export interface RubySettings {
  /** Some settings. */
  common: CommonLanguageSettings;
}
export interface RubySettingsProtoMsg {
  typeUrl: "/google.api.RubySettings";
  value: Uint8Array;
}
/** Settings for Ruby client libraries. */
export interface RubySettingsAmino {
  /** Some settings. */
  common?: CommonLanguageSettingsAmino;
}
export interface RubySettingsAminoMsg {
  type: "/google.api.RubySettings";
  value: RubySettingsAmino;
}
/** Settings for Go client libraries. */
export interface GoSettings {
  /** Some settings. */
  common: CommonLanguageSettings;
}
export interface GoSettingsProtoMsg {
  typeUrl: "/google.api.GoSettings";
  value: Uint8Array;
}
/** Settings for Go client libraries. */
export interface GoSettingsAmino {
  /** Some settings. */
  common?: CommonLanguageSettingsAmino;
}
export interface GoSettingsAminoMsg {
  type: "/google.api.GoSettings";
  value: GoSettingsAmino;
}
/** Describes the generator configuration for a method. */
export interface MethodSettings {
  /**
   * The fully qualified name of the method, for which the options below apply.
   * This is used to find the method to apply the options.
   */
  selector: string;
  /**
   * Describes settings to use for long-running operations when generating
   * API methods for RPCs. Complements RPCs that use the annotations in
   * google/longrunning/operations.proto.
   * 
   * Example of a YAML configuration::
   * 
   *  publishing:
   *    method_behavior:
   *      - selector: CreateAdDomain
   *        long_running:
   *          initial_poll_delay:
   *            seconds: 60 # 1 minute
   *          poll_delay_multiplier: 1.5
   *          max_poll_delay:
   *            seconds: 360 # 6 minutes
   *          total_poll_timeout:
   *             seconds: 54000 # 90 minutes
   */
  longRunning: MethodSettings_LongRunning;
}
export interface MethodSettingsProtoMsg {
  typeUrl: "/google.api.MethodSettings";
  value: Uint8Array;
}
/** Describes the generator configuration for a method. */
export interface MethodSettingsAmino {
  /**
   * The fully qualified name of the method, for which the options below apply.
   * This is used to find the method to apply the options.
   */
  selector: string;
  /**
   * Describes settings to use for long-running operations when generating
   * API methods for RPCs. Complements RPCs that use the annotations in
   * google/longrunning/operations.proto.
   * 
   * Example of a YAML configuration::
   * 
   *  publishing:
   *    method_behavior:
   *      - selector: CreateAdDomain
   *        long_running:
   *          initial_poll_delay:
   *            seconds: 60 # 1 minute
   *          poll_delay_multiplier: 1.5
   *          max_poll_delay:
   *            seconds: 360 # 6 minutes
   *          total_poll_timeout:
   *             seconds: 54000 # 90 minutes
   */
  long_running?: MethodSettings_LongRunningAmino;
}
export interface MethodSettingsAminoMsg {
  type: "/google.api.MethodSettings";
  value: MethodSettingsAmino;
}
/**
 * Describes settings to use when generating API methods that use the
 * long-running operation pattern.
 * All default values below are from those used in the client library
 * generators (e.g.
 * [Java](https://github.com/googleapis/gapic-generator-java/blob/04c2faa191a9b5a10b92392fe8482279c4404803/src/main/java/com/google/api/generator/gapic/composer/common/RetrySettingsComposer.java)).
 */
export interface MethodSettings_LongRunning {
  /**
   * Initial delay after which the first poll request will be made.
   * Default value: 5 seconds.
   */
  initialPollDelay: Duration;
  /**
   * Multiplier to gradually increase delay between subsequent polls until it
   * reaches max_poll_delay.
   * Default value: 1.5.
   */
  pollDelayMultiplier: number;
  /**
   * Maximum time between two subsequent poll requests.
   * Default value: 45 seconds.
   */
  maxPollDelay: Duration;
  /**
   * Total polling timeout.
   * Default value: 5 minutes.
   */
  totalPollTimeout: Duration;
}
export interface MethodSettings_LongRunningProtoMsg {
  typeUrl: "/google.api.LongRunning";
  value: Uint8Array;
}
/**
 * Describes settings to use when generating API methods that use the
 * long-running operation pattern.
 * All default values below are from those used in the client library
 * generators (e.g.
 * [Java](https://github.com/googleapis/gapic-generator-java/blob/04c2faa191a9b5a10b92392fe8482279c4404803/src/main/java/com/google/api/generator/gapic/composer/common/RetrySettingsComposer.java)).
 */
export interface MethodSettings_LongRunningAmino {
  /**
   * Initial delay after which the first poll request will be made.
   * Default value: 5 seconds.
   */
  initial_poll_delay?: DurationAmino;
  /**
   * Multiplier to gradually increase delay between subsequent polls until it
   * reaches max_poll_delay.
   * Default value: 1.5.
   */
  poll_delay_multiplier: number;
  /**
   * Maximum time between two subsequent poll requests.
   * Default value: 45 seconds.
   */
  max_poll_delay?: DurationAmino;
  /**
   * Total polling timeout.
   * Default value: 5 minutes.
   */
  total_poll_timeout?: DurationAmino;
}
export interface MethodSettings_LongRunningAminoMsg {
  type: "/google.api.LongRunning";
  value: MethodSettings_LongRunningAmino;
}
function createBaseCommonLanguageSettings(): CommonLanguageSettings {
  return {
    referenceDocsUri: "",
    destinations: []
  };
}
export const CommonLanguageSettings = {
  encode(message: CommonLanguageSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.referenceDocsUri !== "") {
      writer.uint32(10).string(message.referenceDocsUri);
    }
    writer.uint32(18).fork();
    for (const v of message.destinations) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CommonLanguageSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommonLanguageSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.referenceDocsUri = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.destinations.push((reader.int32() as any));
            }
          } else {
            message.destinations.push((reader.int32() as any));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonLanguageSettings {
    return {
      referenceDocsUri: isSet(object.referenceDocsUri) ? String(object.referenceDocsUri) : "",
      destinations: Array.isArray(object?.destinations) ? object.destinations.map((e: any) => clientLibraryDestinationFromJSON(e)) : []
    };
  },
  toJSON(message: CommonLanguageSettings): unknown {
    const obj: any = {};
    message.referenceDocsUri !== undefined && (obj.referenceDocsUri = message.referenceDocsUri);
    if (message.destinations) {
      obj.destinations = message.destinations.map(e => clientLibraryDestinationToJSON(e));
    } else {
      obj.destinations = [];
    }
    return obj;
  },
  fromPartial(object: DeepPartial<CommonLanguageSettings>): CommonLanguageSettings {
    const message = createBaseCommonLanguageSettings();
    message.referenceDocsUri = object.referenceDocsUri ?? "";
    message.destinations = object.destinations?.map(e => e) || [];
    return message;
  },
  fromAmino(object: CommonLanguageSettingsAmino): CommonLanguageSettings {
    return {
      referenceDocsUri: object.reference_docs_uri,
      destinations: Array.isArray(object?.destinations) ? object.destinations.map((e: any) => clientLibraryDestinationFromJSON(e)) : []
    };
  },
  toAmino(message: CommonLanguageSettings): CommonLanguageSettingsAmino {
    const obj: any = {};
    obj.reference_docs_uri = message.referenceDocsUri;
    if (message.destinations) {
      obj.destinations = message.destinations.map(e => clientLibraryDestinationToJSON(e));
    } else {
      obj.destinations = [];
    }
    return obj;
  },
  fromAminoMsg(object: CommonLanguageSettingsAminoMsg): CommonLanguageSettings {
    return CommonLanguageSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: CommonLanguageSettingsProtoMsg): CommonLanguageSettings {
    return CommonLanguageSettings.decode(message.value);
  },
  toProto(message: CommonLanguageSettings): Uint8Array {
    return CommonLanguageSettings.encode(message).finish();
  },
  toProtoMsg(message: CommonLanguageSettings): CommonLanguageSettingsProtoMsg {
    return {
      typeUrl: "/google.api.CommonLanguageSettings",
      value: CommonLanguageSettings.encode(message).finish()
    };
  }
};
function createBaseClientLibrarySettings(): ClientLibrarySettings {
  return {
    version: "",
    launchStage: 0,
    restNumericEnums: false,
    javaSettings: JavaSettings.fromPartial({}),
    cppSettings: CppSettings.fromPartial({}),
    phpSettings: PhpSettings.fromPartial({}),
    pythonSettings: PythonSettings.fromPartial({}),
    nodeSettings: NodeSettings.fromPartial({}),
    dotnetSettings: DotnetSettings.fromPartial({}),
    rubySettings: RubySettings.fromPartial({}),
    goSettings: GoSettings.fromPartial({})
  };
}
export const ClientLibrarySettings = {
  encode(message: ClientLibrarySettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.launchStage !== 0) {
      writer.uint32(16).int32(message.launchStage);
    }
    if (message.restNumericEnums === true) {
      writer.uint32(24).bool(message.restNumericEnums);
    }
    if (message.javaSettings !== undefined) {
      JavaSettings.encode(message.javaSettings, writer.uint32(170).fork()).ldelim();
    }
    if (message.cppSettings !== undefined) {
      CppSettings.encode(message.cppSettings, writer.uint32(178).fork()).ldelim();
    }
    if (message.phpSettings !== undefined) {
      PhpSettings.encode(message.phpSettings, writer.uint32(186).fork()).ldelim();
    }
    if (message.pythonSettings !== undefined) {
      PythonSettings.encode(message.pythonSettings, writer.uint32(194).fork()).ldelim();
    }
    if (message.nodeSettings !== undefined) {
      NodeSettings.encode(message.nodeSettings, writer.uint32(202).fork()).ldelim();
    }
    if (message.dotnetSettings !== undefined) {
      DotnetSettings.encode(message.dotnetSettings, writer.uint32(210).fork()).ldelim();
    }
    if (message.rubySettings !== undefined) {
      RubySettings.encode(message.rubySettings, writer.uint32(218).fork()).ldelim();
    }
    if (message.goSettings !== undefined) {
      GoSettings.encode(message.goSettings, writer.uint32(226).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ClientLibrarySettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientLibrarySettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        case 2:
          message.launchStage = (reader.int32() as any);
          break;
        case 3:
          message.restNumericEnums = reader.bool();
          break;
        case 21:
          message.javaSettings = JavaSettings.decode(reader, reader.uint32());
          break;
        case 22:
          message.cppSettings = CppSettings.decode(reader, reader.uint32());
          break;
        case 23:
          message.phpSettings = PhpSettings.decode(reader, reader.uint32());
          break;
        case 24:
          message.pythonSettings = PythonSettings.decode(reader, reader.uint32());
          break;
        case 25:
          message.nodeSettings = NodeSettings.decode(reader, reader.uint32());
          break;
        case 26:
          message.dotnetSettings = DotnetSettings.decode(reader, reader.uint32());
          break;
        case 27:
          message.rubySettings = RubySettings.decode(reader, reader.uint32());
          break;
        case 28:
          message.goSettings = GoSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ClientLibrarySettings {
    return {
      version: isSet(object.version) ? String(object.version) : "",
      launchStage: isSet(object.launchStage) ? launchStageFromJSON(object.launchStage) : -1,
      restNumericEnums: isSet(object.restNumericEnums) ? Boolean(object.restNumericEnums) : false,
      javaSettings: isSet(object.javaSettings) ? JavaSettings.fromJSON(object.javaSettings) : undefined,
      cppSettings: isSet(object.cppSettings) ? CppSettings.fromJSON(object.cppSettings) : undefined,
      phpSettings: isSet(object.phpSettings) ? PhpSettings.fromJSON(object.phpSettings) : undefined,
      pythonSettings: isSet(object.pythonSettings) ? PythonSettings.fromJSON(object.pythonSettings) : undefined,
      nodeSettings: isSet(object.nodeSettings) ? NodeSettings.fromJSON(object.nodeSettings) : undefined,
      dotnetSettings: isSet(object.dotnetSettings) ? DotnetSettings.fromJSON(object.dotnetSettings) : undefined,
      rubySettings: isSet(object.rubySettings) ? RubySettings.fromJSON(object.rubySettings) : undefined,
      goSettings: isSet(object.goSettings) ? GoSettings.fromJSON(object.goSettings) : undefined
    };
  },
  toJSON(message: ClientLibrarySettings): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.launchStage !== undefined && (obj.launchStage = launchStageToJSON(message.launchStage));
    message.restNumericEnums !== undefined && (obj.restNumericEnums = message.restNumericEnums);
    message.javaSettings !== undefined && (obj.javaSettings = message.javaSettings ? JavaSettings.toJSON(message.javaSettings) : undefined);
    message.cppSettings !== undefined && (obj.cppSettings = message.cppSettings ? CppSettings.toJSON(message.cppSettings) : undefined);
    message.phpSettings !== undefined && (obj.phpSettings = message.phpSettings ? PhpSettings.toJSON(message.phpSettings) : undefined);
    message.pythonSettings !== undefined && (obj.pythonSettings = message.pythonSettings ? PythonSettings.toJSON(message.pythonSettings) : undefined);
    message.nodeSettings !== undefined && (obj.nodeSettings = message.nodeSettings ? NodeSettings.toJSON(message.nodeSettings) : undefined);
    message.dotnetSettings !== undefined && (obj.dotnetSettings = message.dotnetSettings ? DotnetSettings.toJSON(message.dotnetSettings) : undefined);
    message.rubySettings !== undefined && (obj.rubySettings = message.rubySettings ? RubySettings.toJSON(message.rubySettings) : undefined);
    message.goSettings !== undefined && (obj.goSettings = message.goSettings ? GoSettings.toJSON(message.goSettings) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<ClientLibrarySettings>): ClientLibrarySettings {
    const message = createBaseClientLibrarySettings();
    message.version = object.version ?? "";
    message.launchStage = object.launchStage ?? 0;
    message.restNumericEnums = object.restNumericEnums ?? false;
    message.javaSettings = object.javaSettings !== undefined && object.javaSettings !== null ? JavaSettings.fromPartial(object.javaSettings) : undefined;
    message.cppSettings = object.cppSettings !== undefined && object.cppSettings !== null ? CppSettings.fromPartial(object.cppSettings) : undefined;
    message.phpSettings = object.phpSettings !== undefined && object.phpSettings !== null ? PhpSettings.fromPartial(object.phpSettings) : undefined;
    message.pythonSettings = object.pythonSettings !== undefined && object.pythonSettings !== null ? PythonSettings.fromPartial(object.pythonSettings) : undefined;
    message.nodeSettings = object.nodeSettings !== undefined && object.nodeSettings !== null ? NodeSettings.fromPartial(object.nodeSettings) : undefined;
    message.dotnetSettings = object.dotnetSettings !== undefined && object.dotnetSettings !== null ? DotnetSettings.fromPartial(object.dotnetSettings) : undefined;
    message.rubySettings = object.rubySettings !== undefined && object.rubySettings !== null ? RubySettings.fromPartial(object.rubySettings) : undefined;
    message.goSettings = object.goSettings !== undefined && object.goSettings !== null ? GoSettings.fromPartial(object.goSettings) : undefined;
    return message;
  },
  fromAmino(object: ClientLibrarySettingsAmino): ClientLibrarySettings {
    return {
      version: object.version,
      launchStage: isSet(object.launch_stage) ? launchStageFromJSON(object.launch_stage) : -1,
      restNumericEnums: object.rest_numeric_enums,
      javaSettings: object?.java_settings ? JavaSettings.fromAmino(object.java_settings) : undefined,
      cppSettings: object?.cpp_settings ? CppSettings.fromAmino(object.cpp_settings) : undefined,
      phpSettings: object?.php_settings ? PhpSettings.fromAmino(object.php_settings) : undefined,
      pythonSettings: object?.python_settings ? PythonSettings.fromAmino(object.python_settings) : undefined,
      nodeSettings: object?.node_settings ? NodeSettings.fromAmino(object.node_settings) : undefined,
      dotnetSettings: object?.dotnet_settings ? DotnetSettings.fromAmino(object.dotnet_settings) : undefined,
      rubySettings: object?.ruby_settings ? RubySettings.fromAmino(object.ruby_settings) : undefined,
      goSettings: object?.go_settings ? GoSettings.fromAmino(object.go_settings) : undefined
    };
  },
  toAmino(message: ClientLibrarySettings): ClientLibrarySettingsAmino {
    const obj: any = {};
    obj.version = message.version;
    obj.launch_stage = message.launchStage;
    obj.rest_numeric_enums = message.restNumericEnums;
    obj.java_settings = message.javaSettings ? JavaSettings.toAmino(message.javaSettings) : undefined;
    obj.cpp_settings = message.cppSettings ? CppSettings.toAmino(message.cppSettings) : undefined;
    obj.php_settings = message.phpSettings ? PhpSettings.toAmino(message.phpSettings) : undefined;
    obj.python_settings = message.pythonSettings ? PythonSettings.toAmino(message.pythonSettings) : undefined;
    obj.node_settings = message.nodeSettings ? NodeSettings.toAmino(message.nodeSettings) : undefined;
    obj.dotnet_settings = message.dotnetSettings ? DotnetSettings.toAmino(message.dotnetSettings) : undefined;
    obj.ruby_settings = message.rubySettings ? RubySettings.toAmino(message.rubySettings) : undefined;
    obj.go_settings = message.goSettings ? GoSettings.toAmino(message.goSettings) : undefined;
    return obj;
  },
  fromAminoMsg(object: ClientLibrarySettingsAminoMsg): ClientLibrarySettings {
    return ClientLibrarySettings.fromAmino(object.value);
  },
  fromProtoMsg(message: ClientLibrarySettingsProtoMsg): ClientLibrarySettings {
    return ClientLibrarySettings.decode(message.value);
  },
  toProto(message: ClientLibrarySettings): Uint8Array {
    return ClientLibrarySettings.encode(message).finish();
  },
  toProtoMsg(message: ClientLibrarySettings): ClientLibrarySettingsProtoMsg {
    return {
      typeUrl: "/google.api.ClientLibrarySettings",
      value: ClientLibrarySettings.encode(message).finish()
    };
  }
};
function createBasePublishing(): Publishing {
  return {
    methodSettings: [],
    newIssueUri: "",
    documentationUri: "",
    apiShortName: "",
    githubLabel: "",
    codeownerGithubTeams: [],
    docTagPrefix: "",
    organization: 0,
    librarySettings: []
  };
}
export const Publishing = {
  encode(message: Publishing, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.methodSettings) {
      MethodSettings.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.newIssueUri !== "") {
      writer.uint32(810).string(message.newIssueUri);
    }
    if (message.documentationUri !== "") {
      writer.uint32(818).string(message.documentationUri);
    }
    if (message.apiShortName !== "") {
      writer.uint32(826).string(message.apiShortName);
    }
    if (message.githubLabel !== "") {
      writer.uint32(834).string(message.githubLabel);
    }
    for (const v of message.codeownerGithubTeams) {
      writer.uint32(842).string(v!);
    }
    if (message.docTagPrefix !== "") {
      writer.uint32(850).string(message.docTagPrefix);
    }
    if (message.organization !== 0) {
      writer.uint32(856).int32(message.organization);
    }
    for (const v of message.librarySettings) {
      ClientLibrarySettings.encode(v!, writer.uint32(874).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Publishing {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.methodSettings.push(MethodSettings.decode(reader, reader.uint32()));
          break;
        case 101:
          message.newIssueUri = reader.string();
          break;
        case 102:
          message.documentationUri = reader.string();
          break;
        case 103:
          message.apiShortName = reader.string();
          break;
        case 104:
          message.githubLabel = reader.string();
          break;
        case 105:
          message.codeownerGithubTeams.push(reader.string());
          break;
        case 106:
          message.docTagPrefix = reader.string();
          break;
        case 107:
          message.organization = (reader.int32() as any);
          break;
        case 109:
          message.librarySettings.push(ClientLibrarySettings.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Publishing {
    return {
      methodSettings: Array.isArray(object?.methodSettings) ? object.methodSettings.map((e: any) => MethodSettings.fromJSON(e)) : [],
      newIssueUri: isSet(object.newIssueUri) ? String(object.newIssueUri) : "",
      documentationUri: isSet(object.documentationUri) ? String(object.documentationUri) : "",
      apiShortName: isSet(object.apiShortName) ? String(object.apiShortName) : "",
      githubLabel: isSet(object.githubLabel) ? String(object.githubLabel) : "",
      codeownerGithubTeams: Array.isArray(object?.codeownerGithubTeams) ? object.codeownerGithubTeams.map((e: any) => String(e)) : [],
      docTagPrefix: isSet(object.docTagPrefix) ? String(object.docTagPrefix) : "",
      organization: isSet(object.organization) ? clientLibraryOrganizationFromJSON(object.organization) : -1,
      librarySettings: Array.isArray(object?.librarySettings) ? object.librarySettings.map((e: any) => ClientLibrarySettings.fromJSON(e)) : []
    };
  },
  toJSON(message: Publishing): unknown {
    const obj: any = {};
    if (message.methodSettings) {
      obj.methodSettings = message.methodSettings.map(e => e ? MethodSettings.toJSON(e) : undefined);
    } else {
      obj.methodSettings = [];
    }
    message.newIssueUri !== undefined && (obj.newIssueUri = message.newIssueUri);
    message.documentationUri !== undefined && (obj.documentationUri = message.documentationUri);
    message.apiShortName !== undefined && (obj.apiShortName = message.apiShortName);
    message.githubLabel !== undefined && (obj.githubLabel = message.githubLabel);
    if (message.codeownerGithubTeams) {
      obj.codeownerGithubTeams = message.codeownerGithubTeams.map(e => e);
    } else {
      obj.codeownerGithubTeams = [];
    }
    message.docTagPrefix !== undefined && (obj.docTagPrefix = message.docTagPrefix);
    message.organization !== undefined && (obj.organization = clientLibraryOrganizationToJSON(message.organization));
    if (message.librarySettings) {
      obj.librarySettings = message.librarySettings.map(e => e ? ClientLibrarySettings.toJSON(e) : undefined);
    } else {
      obj.librarySettings = [];
    }
    return obj;
  },
  fromPartial(object: DeepPartial<Publishing>): Publishing {
    const message = createBasePublishing();
    message.methodSettings = object.methodSettings?.map(e => MethodSettings.fromPartial(e)) || [];
    message.newIssueUri = object.newIssueUri ?? "";
    message.documentationUri = object.documentationUri ?? "";
    message.apiShortName = object.apiShortName ?? "";
    message.githubLabel = object.githubLabel ?? "";
    message.codeownerGithubTeams = object.codeownerGithubTeams?.map(e => e) || [];
    message.docTagPrefix = object.docTagPrefix ?? "";
    message.organization = object.organization ?? 0;
    message.librarySettings = object.librarySettings?.map(e => ClientLibrarySettings.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: PublishingAmino): Publishing {
    return {
      methodSettings: Array.isArray(object?.method_settings) ? object.method_settings.map((e: any) => MethodSettings.fromAmino(e)) : [],
      newIssueUri: object.new_issue_uri,
      documentationUri: object.documentation_uri,
      apiShortName: object.api_short_name,
      githubLabel: object.github_label,
      codeownerGithubTeams: Array.isArray(object?.codeowner_github_teams) ? object.codeowner_github_teams.map((e: any) => e) : [],
      docTagPrefix: object.doc_tag_prefix,
      organization: isSet(object.organization) ? clientLibraryOrganizationFromJSON(object.organization) : -1,
      librarySettings: Array.isArray(object?.library_settings) ? object.library_settings.map((e: any) => ClientLibrarySettings.fromAmino(e)) : []
    };
  },
  toAmino(message: Publishing): PublishingAmino {
    const obj: any = {};
    if (message.methodSettings) {
      obj.method_settings = message.methodSettings.map(e => e ? MethodSettings.toAmino(e) : undefined);
    } else {
      obj.method_settings = [];
    }
    obj.new_issue_uri = message.newIssueUri;
    obj.documentation_uri = message.documentationUri;
    obj.api_short_name = message.apiShortName;
    obj.github_label = message.githubLabel;
    if (message.codeownerGithubTeams) {
      obj.codeowner_github_teams = message.codeownerGithubTeams.map(e => e);
    } else {
      obj.codeowner_github_teams = [];
    }
    obj.doc_tag_prefix = message.docTagPrefix;
    obj.organization = message.organization;
    if (message.librarySettings) {
      obj.library_settings = message.librarySettings.map(e => e ? ClientLibrarySettings.toAmino(e) : undefined);
    } else {
      obj.library_settings = [];
    }
    return obj;
  },
  fromAminoMsg(object: PublishingAminoMsg): Publishing {
    return Publishing.fromAmino(object.value);
  },
  fromProtoMsg(message: PublishingProtoMsg): Publishing {
    return Publishing.decode(message.value);
  },
  toProto(message: Publishing): Uint8Array {
    return Publishing.encode(message).finish();
  },
  toProtoMsg(message: Publishing): PublishingProtoMsg {
    return {
      typeUrl: "/google.api.Publishing",
      value: Publishing.encode(message).finish()
    };
  }
};
function createBaseJavaSettings_ServiceClassNamesEntry(): JavaSettings_ServiceClassNamesEntry {
  return {
    key: "",
    value: ""
  };
}
export const JavaSettings_ServiceClassNamesEntry = {
  encode(message: JavaSettings_ServiceClassNamesEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): JavaSettings_ServiceClassNamesEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJavaSettings_ServiceClassNamesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): JavaSettings_ServiceClassNamesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : ""
    };
  },
  toJSON(message: JavaSettings_ServiceClassNamesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
  fromPartial(object: DeepPartial<JavaSettings_ServiceClassNamesEntry>): JavaSettings_ServiceClassNamesEntry {
    const message = createBaseJavaSettings_ServiceClassNamesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: JavaSettings_ServiceClassNamesEntryAmino): JavaSettings_ServiceClassNamesEntry {
    return {
      key: object.key,
      value: object.value
    };
  },
  toAmino(message: JavaSettings_ServiceClassNamesEntry): JavaSettings_ServiceClassNamesEntryAmino {
    const obj: any = {};
    obj.key = message.key;
    obj.value = message.value;
    return obj;
  },
  fromAminoMsg(object: JavaSettings_ServiceClassNamesEntryAminoMsg): JavaSettings_ServiceClassNamesEntry {
    return JavaSettings_ServiceClassNamesEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: JavaSettings_ServiceClassNamesEntryProtoMsg): JavaSettings_ServiceClassNamesEntry {
    return JavaSettings_ServiceClassNamesEntry.decode(message.value);
  },
  toProto(message: JavaSettings_ServiceClassNamesEntry): Uint8Array {
    return JavaSettings_ServiceClassNamesEntry.encode(message).finish();
  }
};
function createBaseJavaSettings(): JavaSettings {
  return {
    libraryPackage: "",
    serviceClassNames: {},
    common: CommonLanguageSettings.fromPartial({})
  };
}
export const JavaSettings = {
  encode(message: JavaSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.libraryPackage !== "") {
      writer.uint32(10).string(message.libraryPackage);
    }
    Object.entries(message.serviceClassNames).forEach(([key, value]) => {
      JavaSettings_ServiceClassNamesEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(18).fork()).ldelim();
    });
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): JavaSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJavaSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.libraryPackage = reader.string();
          break;
        case 2:
          const entry2 = JavaSettings_ServiceClassNamesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.serviceClassNames[entry2.key] = entry2.value;
          }
          break;
        case 3:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): JavaSettings {
    return {
      libraryPackage: isSet(object.libraryPackage) ? String(object.libraryPackage) : "",
      serviceClassNames: isObject(object.serviceClassNames) ? Object.entries(object.serviceClassNames).reduce<{
        [key: string]: string;
      }>((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {}) : {},
      common: isSet(object.common) ? CommonLanguageSettings.fromJSON(object.common) : undefined
    };
  },
  toJSON(message: JavaSettings): unknown {
    const obj: any = {};
    message.libraryPackage !== undefined && (obj.libraryPackage = message.libraryPackage);
    obj.serviceClassNames = {};
    if (message.serviceClassNames) {
      Object.entries(message.serviceClassNames).forEach(([k, v]) => {
        obj.serviceClassNames[k] = v;
      });
    }
    message.common !== undefined && (obj.common = message.common ? CommonLanguageSettings.toJSON(message.common) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<JavaSettings>): JavaSettings {
    const message = createBaseJavaSettings();
    message.libraryPackage = object.libraryPackage ?? "";
    message.serviceClassNames = Object.entries(object.serviceClassNames ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: JavaSettingsAmino): JavaSettings {
    return {
      libraryPackage: object.library_package,
      serviceClassNames: isObject(object.service_class_names) ? Object.entries(object.service_class_names).reduce<{
        [key: string]: string;
      }>((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {}) : {},
      common: object?.common ? CommonLanguageSettings.fromAmino(object.common) : undefined
    };
  },
  toAmino(message: JavaSettings): JavaSettingsAmino {
    const obj: any = {};
    obj.library_package = message.libraryPackage;
    obj.service_class_names = {};
    if (message.serviceClassNames) {
      Object.entries(message.serviceClassNames).forEach(([k, v]) => {
        obj.service_class_names[k] = v;
      });
    }
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: JavaSettingsAminoMsg): JavaSettings {
    return JavaSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: JavaSettingsProtoMsg): JavaSettings {
    return JavaSettings.decode(message.value);
  },
  toProto(message: JavaSettings): Uint8Array {
    return JavaSettings.encode(message).finish();
  },
  toProtoMsg(message: JavaSettings): JavaSettingsProtoMsg {
    return {
      typeUrl: "/google.api.JavaSettings",
      value: JavaSettings.encode(message).finish()
    };
  }
};
function createBaseCppSettings(): CppSettings {
  return {
    common: CommonLanguageSettings.fromPartial({})
  };
}
export const CppSettings = {
  encode(message: CppSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CppSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCppSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CppSettings {
    return {
      common: isSet(object.common) ? CommonLanguageSettings.fromJSON(object.common) : undefined
    };
  },
  toJSON(message: CppSettings): unknown {
    const obj: any = {};
    message.common !== undefined && (obj.common = message.common ? CommonLanguageSettings.toJSON(message.common) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<CppSettings>): CppSettings {
    const message = createBaseCppSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: CppSettingsAmino): CppSettings {
    return {
      common: object?.common ? CommonLanguageSettings.fromAmino(object.common) : undefined
    };
  },
  toAmino(message: CppSettings): CppSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: CppSettingsAminoMsg): CppSettings {
    return CppSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: CppSettingsProtoMsg): CppSettings {
    return CppSettings.decode(message.value);
  },
  toProto(message: CppSettings): Uint8Array {
    return CppSettings.encode(message).finish();
  },
  toProtoMsg(message: CppSettings): CppSettingsProtoMsg {
    return {
      typeUrl: "/google.api.CppSettings",
      value: CppSettings.encode(message).finish()
    };
  }
};
function createBasePhpSettings(): PhpSettings {
  return {
    common: CommonLanguageSettings.fromPartial({})
  };
}
export const PhpSettings = {
  encode(message: PhpSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PhpSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePhpSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PhpSettings {
    return {
      common: isSet(object.common) ? CommonLanguageSettings.fromJSON(object.common) : undefined
    };
  },
  toJSON(message: PhpSettings): unknown {
    const obj: any = {};
    message.common !== undefined && (obj.common = message.common ? CommonLanguageSettings.toJSON(message.common) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<PhpSettings>): PhpSettings {
    const message = createBasePhpSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: PhpSettingsAmino): PhpSettings {
    return {
      common: object?.common ? CommonLanguageSettings.fromAmino(object.common) : undefined
    };
  },
  toAmino(message: PhpSettings): PhpSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: PhpSettingsAminoMsg): PhpSettings {
    return PhpSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: PhpSettingsProtoMsg): PhpSettings {
    return PhpSettings.decode(message.value);
  },
  toProto(message: PhpSettings): Uint8Array {
    return PhpSettings.encode(message).finish();
  },
  toProtoMsg(message: PhpSettings): PhpSettingsProtoMsg {
    return {
      typeUrl: "/google.api.PhpSettings",
      value: PhpSettings.encode(message).finish()
    };
  }
};
function createBasePythonSettings(): PythonSettings {
  return {
    common: CommonLanguageSettings.fromPartial({})
  };
}
export const PythonSettings = {
  encode(message: PythonSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PythonSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePythonSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PythonSettings {
    return {
      common: isSet(object.common) ? CommonLanguageSettings.fromJSON(object.common) : undefined
    };
  },
  toJSON(message: PythonSettings): unknown {
    const obj: any = {};
    message.common !== undefined && (obj.common = message.common ? CommonLanguageSettings.toJSON(message.common) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<PythonSettings>): PythonSettings {
    const message = createBasePythonSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: PythonSettingsAmino): PythonSettings {
    return {
      common: object?.common ? CommonLanguageSettings.fromAmino(object.common) : undefined
    };
  },
  toAmino(message: PythonSettings): PythonSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: PythonSettingsAminoMsg): PythonSettings {
    return PythonSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: PythonSettingsProtoMsg): PythonSettings {
    return PythonSettings.decode(message.value);
  },
  toProto(message: PythonSettings): Uint8Array {
    return PythonSettings.encode(message).finish();
  },
  toProtoMsg(message: PythonSettings): PythonSettingsProtoMsg {
    return {
      typeUrl: "/google.api.PythonSettings",
      value: PythonSettings.encode(message).finish()
    };
  }
};
function createBaseNodeSettings(): NodeSettings {
  return {
    common: CommonLanguageSettings.fromPartial({})
  };
}
export const NodeSettings = {
  encode(message: NodeSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): NodeSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): NodeSettings {
    return {
      common: isSet(object.common) ? CommonLanguageSettings.fromJSON(object.common) : undefined
    };
  },
  toJSON(message: NodeSettings): unknown {
    const obj: any = {};
    message.common !== undefined && (obj.common = message.common ? CommonLanguageSettings.toJSON(message.common) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<NodeSettings>): NodeSettings {
    const message = createBaseNodeSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: NodeSettingsAmino): NodeSettings {
    return {
      common: object?.common ? CommonLanguageSettings.fromAmino(object.common) : undefined
    };
  },
  toAmino(message: NodeSettings): NodeSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: NodeSettingsAminoMsg): NodeSettings {
    return NodeSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: NodeSettingsProtoMsg): NodeSettings {
    return NodeSettings.decode(message.value);
  },
  toProto(message: NodeSettings): Uint8Array {
    return NodeSettings.encode(message).finish();
  },
  toProtoMsg(message: NodeSettings): NodeSettingsProtoMsg {
    return {
      typeUrl: "/google.api.NodeSettings",
      value: NodeSettings.encode(message).finish()
    };
  }
};
function createBaseDotnetSettings(): DotnetSettings {
  return {
    common: CommonLanguageSettings.fromPartial({})
  };
}
export const DotnetSettings = {
  encode(message: DotnetSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DotnetSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDotnetSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DotnetSettings {
    return {
      common: isSet(object.common) ? CommonLanguageSettings.fromJSON(object.common) : undefined
    };
  },
  toJSON(message: DotnetSettings): unknown {
    const obj: any = {};
    message.common !== undefined && (obj.common = message.common ? CommonLanguageSettings.toJSON(message.common) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<DotnetSettings>): DotnetSettings {
    const message = createBaseDotnetSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: DotnetSettingsAmino): DotnetSettings {
    return {
      common: object?.common ? CommonLanguageSettings.fromAmino(object.common) : undefined
    };
  },
  toAmino(message: DotnetSettings): DotnetSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: DotnetSettingsAminoMsg): DotnetSettings {
    return DotnetSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: DotnetSettingsProtoMsg): DotnetSettings {
    return DotnetSettings.decode(message.value);
  },
  toProto(message: DotnetSettings): Uint8Array {
    return DotnetSettings.encode(message).finish();
  },
  toProtoMsg(message: DotnetSettings): DotnetSettingsProtoMsg {
    return {
      typeUrl: "/google.api.DotnetSettings",
      value: DotnetSettings.encode(message).finish()
    };
  }
};
function createBaseRubySettings(): RubySettings {
  return {
    common: CommonLanguageSettings.fromPartial({})
  };
}
export const RubySettings = {
  encode(message: RubySettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RubySettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRubySettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RubySettings {
    return {
      common: isSet(object.common) ? CommonLanguageSettings.fromJSON(object.common) : undefined
    };
  },
  toJSON(message: RubySettings): unknown {
    const obj: any = {};
    message.common !== undefined && (obj.common = message.common ? CommonLanguageSettings.toJSON(message.common) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<RubySettings>): RubySettings {
    const message = createBaseRubySettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: RubySettingsAmino): RubySettings {
    return {
      common: object?.common ? CommonLanguageSettings.fromAmino(object.common) : undefined
    };
  },
  toAmino(message: RubySettings): RubySettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: RubySettingsAminoMsg): RubySettings {
    return RubySettings.fromAmino(object.value);
  },
  fromProtoMsg(message: RubySettingsProtoMsg): RubySettings {
    return RubySettings.decode(message.value);
  },
  toProto(message: RubySettings): Uint8Array {
    return RubySettings.encode(message).finish();
  },
  toProtoMsg(message: RubySettings): RubySettingsProtoMsg {
    return {
      typeUrl: "/google.api.RubySettings",
      value: RubySettings.encode(message).finish()
    };
  }
};
function createBaseGoSettings(): GoSettings {
  return {
    common: CommonLanguageSettings.fromPartial({})
  };
}
export const GoSettings = {
  encode(message: GoSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.common !== undefined) {
      CommonLanguageSettings.encode(message.common, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GoSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGoSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.common = CommonLanguageSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GoSettings {
    return {
      common: isSet(object.common) ? CommonLanguageSettings.fromJSON(object.common) : undefined
    };
  },
  toJSON(message: GoSettings): unknown {
    const obj: any = {};
    message.common !== undefined && (obj.common = message.common ? CommonLanguageSettings.toJSON(message.common) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<GoSettings>): GoSettings {
    const message = createBaseGoSettings();
    message.common = object.common !== undefined && object.common !== null ? CommonLanguageSettings.fromPartial(object.common) : undefined;
    return message;
  },
  fromAmino(object: GoSettingsAmino): GoSettings {
    return {
      common: object?.common ? CommonLanguageSettings.fromAmino(object.common) : undefined
    };
  },
  toAmino(message: GoSettings): GoSettingsAmino {
    const obj: any = {};
    obj.common = message.common ? CommonLanguageSettings.toAmino(message.common) : undefined;
    return obj;
  },
  fromAminoMsg(object: GoSettingsAminoMsg): GoSettings {
    return GoSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: GoSettingsProtoMsg): GoSettings {
    return GoSettings.decode(message.value);
  },
  toProto(message: GoSettings): Uint8Array {
    return GoSettings.encode(message).finish();
  },
  toProtoMsg(message: GoSettings): GoSettingsProtoMsg {
    return {
      typeUrl: "/google.api.GoSettings",
      value: GoSettings.encode(message).finish()
    };
  }
};
function createBaseMethodSettings(): MethodSettings {
  return {
    selector: "",
    longRunning: MethodSettings_LongRunning.fromPartial({})
  };
}
export const MethodSettings = {
  encode(message: MethodSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.selector !== "") {
      writer.uint32(10).string(message.selector);
    }
    if (message.longRunning !== undefined) {
      MethodSettings_LongRunning.encode(message.longRunning, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MethodSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMethodSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.selector = reader.string();
          break;
        case 2:
          message.longRunning = MethodSettings_LongRunning.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MethodSettings {
    return {
      selector: isSet(object.selector) ? String(object.selector) : "",
      longRunning: isSet(object.longRunning) ? MethodSettings_LongRunning.fromJSON(object.longRunning) : undefined
    };
  },
  toJSON(message: MethodSettings): unknown {
    const obj: any = {};
    message.selector !== undefined && (obj.selector = message.selector);
    message.longRunning !== undefined && (obj.longRunning = message.longRunning ? MethodSettings_LongRunning.toJSON(message.longRunning) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<MethodSettings>): MethodSettings {
    const message = createBaseMethodSettings();
    message.selector = object.selector ?? "";
    message.longRunning = object.longRunning !== undefined && object.longRunning !== null ? MethodSettings_LongRunning.fromPartial(object.longRunning) : undefined;
    return message;
  },
  fromAmino(object: MethodSettingsAmino): MethodSettings {
    return {
      selector: object.selector,
      longRunning: object?.long_running ? MethodSettings_LongRunning.fromAmino(object.long_running) : undefined
    };
  },
  toAmino(message: MethodSettings): MethodSettingsAmino {
    const obj: any = {};
    obj.selector = message.selector;
    obj.long_running = message.longRunning ? MethodSettings_LongRunning.toAmino(message.longRunning) : undefined;
    return obj;
  },
  fromAminoMsg(object: MethodSettingsAminoMsg): MethodSettings {
    return MethodSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: MethodSettingsProtoMsg): MethodSettings {
    return MethodSettings.decode(message.value);
  },
  toProto(message: MethodSettings): Uint8Array {
    return MethodSettings.encode(message).finish();
  },
  toProtoMsg(message: MethodSettings): MethodSettingsProtoMsg {
    return {
      typeUrl: "/google.api.MethodSettings",
      value: MethodSettings.encode(message).finish()
    };
  }
};
function createBaseMethodSettings_LongRunning(): MethodSettings_LongRunning {
  return {
    initialPollDelay: Duration.fromPartial({}),
    pollDelayMultiplier: 0,
    maxPollDelay: Duration.fromPartial({}),
    totalPollTimeout: Duration.fromPartial({})
  };
}
export const MethodSettings_LongRunning = {
  encode(message: MethodSettings_LongRunning, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.initialPollDelay !== undefined) {
      Duration.encode(message.initialPollDelay, writer.uint32(10).fork()).ldelim();
    }
    if (message.pollDelayMultiplier !== 0) {
      writer.uint32(21).float(message.pollDelayMultiplier);
    }
    if (message.maxPollDelay !== undefined) {
      Duration.encode(message.maxPollDelay, writer.uint32(26).fork()).ldelim();
    }
    if (message.totalPollTimeout !== undefined) {
      Duration.encode(message.totalPollTimeout, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MethodSettings_LongRunning {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMethodSettings_LongRunning();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.initialPollDelay = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.pollDelayMultiplier = reader.float();
          break;
        case 3:
          message.maxPollDelay = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.totalPollTimeout = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MethodSettings_LongRunning {
    return {
      initialPollDelay: isSet(object.initialPollDelay) ? Duration.fromJSON(object.initialPollDelay) : undefined,
      pollDelayMultiplier: isSet(object.pollDelayMultiplier) ? Number(object.pollDelayMultiplier) : 0,
      maxPollDelay: isSet(object.maxPollDelay) ? Duration.fromJSON(object.maxPollDelay) : undefined,
      totalPollTimeout: isSet(object.totalPollTimeout) ? Duration.fromJSON(object.totalPollTimeout) : undefined
    };
  },
  toJSON(message: MethodSettings_LongRunning): unknown {
    const obj: any = {};
    message.initialPollDelay !== undefined && (obj.initialPollDelay = message.initialPollDelay ? Duration.toJSON(message.initialPollDelay) : undefined);
    message.pollDelayMultiplier !== undefined && (obj.pollDelayMultiplier = message.pollDelayMultiplier);
    message.maxPollDelay !== undefined && (obj.maxPollDelay = message.maxPollDelay ? Duration.toJSON(message.maxPollDelay) : undefined);
    message.totalPollTimeout !== undefined && (obj.totalPollTimeout = message.totalPollTimeout ? Duration.toJSON(message.totalPollTimeout) : undefined);
    return obj;
  },
  fromPartial(object: DeepPartial<MethodSettings_LongRunning>): MethodSettings_LongRunning {
    const message = createBaseMethodSettings_LongRunning();
    message.initialPollDelay = object.initialPollDelay !== undefined && object.initialPollDelay !== null ? Duration.fromPartial(object.initialPollDelay) : undefined;
    message.pollDelayMultiplier = object.pollDelayMultiplier ?? 0;
    message.maxPollDelay = object.maxPollDelay !== undefined && object.maxPollDelay !== null ? Duration.fromPartial(object.maxPollDelay) : undefined;
    message.totalPollTimeout = object.totalPollTimeout !== undefined && object.totalPollTimeout !== null ? Duration.fromPartial(object.totalPollTimeout) : undefined;
    return message;
  },
  fromAmino(object: MethodSettings_LongRunningAmino): MethodSettings_LongRunning {
    return {
      initialPollDelay: object?.initial_poll_delay ? Duration.fromAmino(object.initial_poll_delay) : undefined,
      pollDelayMultiplier: object.poll_delay_multiplier,
      maxPollDelay: object?.max_poll_delay ? Duration.fromAmino(object.max_poll_delay) : undefined,
      totalPollTimeout: object?.total_poll_timeout ? Duration.fromAmino(object.total_poll_timeout) : undefined
    };
  },
  toAmino(message: MethodSettings_LongRunning): MethodSettings_LongRunningAmino {
    const obj: any = {};
    obj.initial_poll_delay = message.initialPollDelay ? Duration.toAmino(message.initialPollDelay) : undefined;
    obj.poll_delay_multiplier = message.pollDelayMultiplier;
    obj.max_poll_delay = message.maxPollDelay ? Duration.toAmino(message.maxPollDelay) : undefined;
    obj.total_poll_timeout = message.totalPollTimeout ? Duration.toAmino(message.totalPollTimeout) : undefined;
    return obj;
  },
  fromAminoMsg(object: MethodSettings_LongRunningAminoMsg): MethodSettings_LongRunning {
    return MethodSettings_LongRunning.fromAmino(object.value);
  },
  fromProtoMsg(message: MethodSettings_LongRunningProtoMsg): MethodSettings_LongRunning {
    return MethodSettings_LongRunning.decode(message.value);
  },
  toProto(message: MethodSettings_LongRunning): Uint8Array {
    return MethodSettings_LongRunning.encode(message).finish();
  },
  toProtoMsg(message: MethodSettings_LongRunning): MethodSettings_LongRunningProtoMsg {
    return {
      typeUrl: "/google.api.LongRunning",
      value: MethodSettings_LongRunning.encode(message).finish()
    };
  }
};