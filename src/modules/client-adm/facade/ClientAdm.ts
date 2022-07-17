import { IUseCase } from '../../@shared/usecase/IUseCase';
import {
  IInputAddClientFacadeDto,
  IInputFindClientFacadeDto,
  IOutputFindClientFacadeDto,
} from './dtos';

export interface IUseCaseProps {
  addUseCase: IUseCase;
  findUseCase: IUseCase;
}

export class ClientAdmFacade {
  private _findUseCase: IUseCase;
  private _addUseCase: IUseCase;

  constructor(props: IUseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._addUseCase = props.addUseCase;
  }

  async add(input: IInputAddClientFacadeDto): Promise<void> {
    await this._addUseCase.execute(input);
  }

  async find(
    input: IInputFindClientFacadeDto
  ): Promise<IOutputFindClientFacadeDto> {
    throw new Error('Method not implemented.');
  }
}
