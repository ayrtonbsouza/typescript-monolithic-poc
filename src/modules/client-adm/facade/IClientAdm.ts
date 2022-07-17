import {
  IInputAddClientFacadeDto,
  IInputFindClientFacadeDto,
  IOutputFindClientFacadeDto,
} from './dtos';

export interface IClientAdmFacade {
  add(input: IInputAddClientFacadeDto): Promise<void>;
  find(input: IInputFindClientFacadeDto): Promise<IOutputFindClientFacadeDto>;
}
