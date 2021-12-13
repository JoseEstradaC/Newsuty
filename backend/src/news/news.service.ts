import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './news.model';
import { getNewsFromURL } from '../tools/getNewsFromUrl';
import { NewsDto } from 'src/dto';
import { Roles } from '../users/user.model';

@Injectable()
export class NewsService {
  constructor(@InjectModel('News') private readonly newsModel: Model<News>) {}

  async createNewFromUrl(url: string, userID: string) {
    if (await this.existURLInDB(url)) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'News exist',
        },
        HttpStatus.CONFLICT,
      );
    }
    const urlData = await getNewsFromURL(url);
    if (!urlData) {
      throw new HttpException(
        {
          status: HttpStatus.EXPECTATION_FAILED,
          error: 'Fail to load info from URL',
        },
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const news: NewsDto = {
      userID,
      url,
      urlImagen: urlData.image,
      titulo: urlData.title,
    };

    const newNews = new this.newsModel(news);
    const result = await newNews.save();
    const id: string = result.id;
    return { id };
  }

  async createNewFromData(newsDto: NewsDto) {
    if (await this.existURLInDB(newsDto.url)) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'News exist',
        },
        HttpStatus.CONFLICT,
      );
    }

    const newNews = new this.newsModel(newsDto);
    const result = await newNews.save();
    const id: string = result.id;
    return { id };
  }

  async getUserNewsPagination(iteration: number, userID: string) {
    const allNews = await this.newsModel.find({ userID });
    // .skip(iteration * 10)
    // .limit(10);

    function compare(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    }

    const sortNews = allNews.sort(compare);

    const news10 = sortNews.slice(iteration * 10, iteration * 10 + 10);

    const newsResult = news10.map((news) => {
      // Aqui se prodria cambiar la userID por el nombre de usuario el cual la creo
      const newsJson = JSON.stringify(news);
      const returnObj = JSON.parse(newsJson);
      returnObj.vote = this.userHasVote(news, userID);
      return returnObj;
    });

    const numberOfNews = await this.newsModel.countDocuments({});
    return {
      fin: (iteration + 1) * 10 >= numberOfNews,
      news: newsResult,
    };
  }

  async getNewNewsPagination(iteration: number, userID: string) {
    const allNews = await this.newsModel.find();
    // .skip(iteration * 10)
    // .limit(10);

    function compare(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    }

    const sortNews = allNews.sort(compare);

    const news10 = sortNews.slice(iteration * 10, iteration * 10 + 10);

    const newsResult = news10.map((news) => {
      // Aqui se prodria cambiar la userID por el nombre de usuario el cual la creo
      const newsJson = JSON.stringify(news);
      const returnObj = JSON.parse(newsJson);
      returnObj.vote = this.userHasVote(news, userID);
      return returnObj;
    });

    const numberOfNews = await this.newsModel.countDocuments({});
    return {
      fin: (iteration + 1) * 10 >= numberOfNews,
      news: newsResult,
    };
  }

  async existURLInDB(url: string) {
    const result = await this.newsModel.findOne({ url }).exec();
    if (!result) return false;
    return true;
  }

  async existNewsInDB(id: string) {
    const result = await this.newsModel.findById(id).exec();
    if (!result) return false;
    return result;
  }

  async deleteNews(idNews: string, idUser: string, claim: Roles) {
    const news = await this.existNewsInDB(idNews);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'News not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (news.userID === idUser || claim === Roles.admin) {
      this.newsModel.findByIdAndRemove(idNews).exec();
      return { id: idNews };
    } else {
      throw new UnauthorizedException();
    }
  }

  userHasVote(news: News, idUser: string) {
    const hasVotedLike = news.likes.find((newUserId) => newUserId === idUser);
    if (hasVotedLike) {
      return 1;
    }
    const hasVoteDislike = news.dislikes.find(
      (newUserId) => newUserId === idUser,
    );
    if (hasVoteDislike) {
      return 2;
    }
    return 0;
  }

  async addVote(idNews: string, idUser: string, isLike: boolean) {
    const news = await this.existNewsInDB(idNews);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'News not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (this.userHasVote(news, idUser) !== 0) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'This user has already voted this news',
        },
        HttpStatus.CONFLICT,
      );
    }

    if (isLike) {
      news.likes = [...news.likes, idUser];
    } else {
      news.dislikes = [...news.dislikes, idUser];
    }
    await news.save();

    //agregamos si el usuario a votado o no
    const newsJson = JSON.stringify(news);
    const returnObj = JSON.parse(newsJson);
    returnObj.vote = this.userHasVote(news, idUser);

    return returnObj;
  }

  async deleteVote(idNews: string, idUser: string) {
    const news = await this.existNewsInDB(idNews);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'News not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const findVote = this.userHasVote(news, idUser);
    if (findVote === 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'The user has not yet voted on this news',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (findVote === 1) {
      news.likes = news.likes.filter((newsidUser) => newsidUser !== idUser);
    } else {
      news.dislikes = news.dislikes.filter(
        (newsidUser) => newsidUser !== idUser,
      );
    }
    await news.save();

    //agregamos si el usuario a votado o no
    const newsJson = JSON.stringify(news);
    const returnObj = JSON.parse(newsJson);
    returnObj.vote = this.userHasVote(news, idUser);

    return returnObj;
  }

  async getNewsPagination10(iteration: number, userID: string) {
    const allNews = await this.newsModel.find();
    // .skip(iteration * 10)
    // .limit(10);

    function compare(a, b) {
      if (a.countLikes - a.countDislikes < b.countLikes - b.countDislikes) {
        return 1;
      }
      if (a.countLikes - a.countDislikes > b.countLikes - b.countDislikes) {
        return -1;
      }
      return 0;
    }

    const sortNews = allNews.sort(compare);

    const news10 = sortNews.slice(iteration * 10, iteration * 10 + 10);

    const newsResult = news10.map((news) => {
      // Aqui se prodria cambiar la userID por el nombre de usuario el cual la creo
      const newsJson = JSON.stringify(news);
      const returnObj = JSON.parse(newsJson);
      returnObj.vote = this.userHasVote(news, userID);
      return returnObj;
    });

    const numberOfNews = await this.newsModel.countDocuments({});
    return {
      fin: (iteration + 1) * 10 >= numberOfNews,
      news: newsResult,
    };
  }

  async updateNews(
    idNews: string,
    newsTitulo: string,
    newsUrlImagen: string,
    newsUrl: string,
    idUser: string,
    claim: Roles,
  ) {
    const news = await this.existNewsInDB(idNews);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'News not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (news.userID === idUser || claim === Roles.admin) {
      news.titulo = newsTitulo;
      news.urlImagen = newsUrlImagen;
      news.url = newsUrl;
      const result = await news.save();
      return { result };
    } else {
      throw new UnauthorizedException();
    }
  }
}
