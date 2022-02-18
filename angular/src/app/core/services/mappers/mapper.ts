/**
 * Mapper of DTO to domain model.
 */
export interface IMapperFromDto<TDto, TModel> {

  /**
   * Maps from DTO to Domain model.
   */
  fromDto: (data: TDto) => TModel;
}

/**
 * Mapper of domain model to DTO.
 */
export interface IMapperToDto<TModel, TDto> {

   /**
   * Maps from Domain to DTO model.
   */
  toDto: (data: TModel) => TDto;
}

