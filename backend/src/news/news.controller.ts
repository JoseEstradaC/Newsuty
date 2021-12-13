import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewsDto } from 'src/dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  //Crea una nuevo noticia a partir de una url
  @Post('add/url')
  @UseGuards(AuthGuard('jwt'))
  async createNewsByURL(@Request() req: any, @Body() data: { url: string }) {
    const news = await this.newsService.createNewFromUrl(
      data.url,
      req.user.sub,
    );
    return news;
  }

  //Crea una nuevo noticia a partir de los datos
  @Post('add/data')
  @UseGuards(AuthGuard('jwt'))
  async createNewFromData(@Request() req: any, @Body() newsDto: NewsDto) {
    newsDto.userID = req.user.sub;
    const news = await this.newsService.createNewFromData(newsDto);
    return news;
  }

  //Todas las news del user 10 en 10
  @Get('user/:iterador')
  @UseGuards(AuthGuard('jwt'))
  async getNewsUserPagination10(
    @Request() req: any,
    @Param('iterador') iterador: number,
  ) {
    const news = await this.newsService.getUserNewsPagination(
      iterador,
      req.user.sub,
    );
    return news;
  }

  //Todas las news de 10 en 10 ordenadas por tiempo
  @Get('new/:iterador')
  @UseGuards(AuthGuard('jwt'))
  async getNewNewsPagination(
    @Request() req: any,
    @Param('iterador') iterador: number,
  ) {
    const news = await this.newsService.getNewNewsPagination(
      iterador,
      req.user.sub,
    );
    return news;
  }

  //Borrar una noticia, solo si eres el creador o un admin
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async signupLocal(@Request() req: any, @Param('id') id: string) {
    const news = await this.newsService.deleteNews(
      id,
      req.user.sub,
      req.user.claim,
    );
    return news;
  }

  @Post('add/vote')
  @UseGuards(AuthGuard('jwt'))
  async addVote(
    @Request() req: any,
    @Body() data: { id: string; isLike: boolean },
  ) {
    const news = await this.newsService.addVote(
      data.id,
      req.user.sub,
      data.isLike,
    );
    return news;
  }

  @Post('remove/vote')
  @UseGuards(AuthGuard('jwt'))
  async deleteVote(@Request() req: any, @Body() data: { id: string }) {
    const news = await this.newsService.deleteVote(data.id, req.user.sub);
    return news;
  }

  //Todas las news de 10 en 10 ordenada por populares
  @Get('dest/:iterador')
  @UseGuards(AuthGuard('jwt'))
  async getNewsPagination10(
    @Request() req: any,
    @Param('iterador') iterador: number,
  ) {
    const news = await this.newsService.getNewsPagination10(
      iterador,
      req.user.sub,
    );
    return news;
  }

  @Patch('')
  @UseGuards(AuthGuard('jwt'))
  async updateNews(
    @Request() req: any,
    @Body()
    data: {
      idNews: string;
      newsTitulo: string;
      newsUrlImagen: string;
      newsUrl: string;
    },
  ) {
    return this.newsService.updateNews(
      data.idNews,
      data.newsTitulo,
      data.newsUrlImagen,
      data.newsUrl,
      req.user.user,
      req.user.claim,
    );
  }
}
